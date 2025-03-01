const yts = require('yt-search');
const axios = require('axios');

const extractVid = (data) => {
    const match = /(?:youtu\.be\/|youtube\.com(?:.*[?&]v=|.*\/))([^?&]+)/.exec(data);
    return match ? match[1] : null;
};

const info = async (id) => {
    const { title, description, url, videoId, seconds, timestamp, views, genre, uploadDate, ago, image, thumbnail, author } = await yts({ videoId: id });
    return { title, description, url, videoId, seconds, timestamp, views, genre, uploadDate, ago, image, thumbnail, author };
};

const fetchDownloadLinks = async (id) => {
    const headers = {
        Accept: "*/*",
        Origin: "https://id-y2mate.com",
        Referer: `https://id-y2mate.com/${id}`,
        'User-Agent': 'Postify/1.0.0',
        'X-Requested-With': 'XMLHttpRequest',
    };

    const response = await axios.post('https://id-y2mate.com/mates/analyzeV2/ajax', new URLSearchParams({
        k_query: `https://youtube.com/watch?v=${id}`,
        k_page: 'home',
        q_auto: 0,
    }), { headers });

    if (!response.data || !response.data.links) throw new Error('Gak ada response dari api nya 😮‍💨 ');

    return Object.entries(response.data.links).reduce((acc, [format, links]) => {
        acc[format] = Object.fromEntries(Object.values(links).map(option => [
            option.q || option.f, 
            async () => {
                const res = await axios.post('https://id-y2mate.com/mates/convertV2/index', new URLSearchParams({ vid: id, k: option.k }), { headers });
                if (res.data.status !== 'ok') throw new Error('Cukup tau aja yak.. error bree');
                return { size: option.size, format: option.f, url: res.data.dlink };
            }
        ]));
        return acc;
    }, { mp3: {}, mp4: {} });
};

const search = async (query) => {
    const videos = await yts(query).then(v => v.videos);
    return videos.map(({ videoId, views, url, title, description, image, thumbnail, seconds, timestamp, ago, author }) => ({
        title, id: videoId, url,
        media: { thumbnail: thumbnail || "", image },
        description, duration: { seconds, timestamp }, published: ago, views, author
    }));
};

const YTMate = async (data) => {
    if (!data.trim()) throw new Error('Gausah bertele tele, tinggal masukin aja link youtube atau query yg mau dicari...');
    const isLink = /youtu(\.)?be/.test(data);
    if (isLink) {
        const id = extractVid(data);
        if (!id) throw new Error('Error ceunah bree, ID nya gak adaa');
        const videoInfo = await info(id);
        const downloadLinks = await fetchDownloadLinks(id);
        return { type: 'download', download: { ...videoInfo, dl: downloadLinks } };
    } else {
        const videos = await search(data);
        return { type: 'search', query: data, total: videos.length, videos };
    }
};

const handler = async (m, { conn, args }) => {
    if (!args[0]) return conn.sendMessage(m.chat, { text: 'Masukin link YouTube.' }, { quoted: m });

    try {
        const query = args.join(' ');
        const result = await YTMate(query);
        
        if (result.type === 'download') {
            const video = result.download;
            const mp4Links = video.dl.mp4;
            const mp3Links = video.dl.mp3;
            let isMediaSent = false;

            if (mp4Links['1080p']) {
                const video1080pLink = await mp4Links['1080p']();
                await conn.sendMessage(m.chat, { 
                    video: { url: video1080pLink.url },
                    caption: `🎥 Video 1080p - ${video.title}`,
                    mimetype: 'video/mp4',
                }, { quoted: m });
                isMediaSent = true;
            }

            if (mp3Links['128kbps']) {
                const audioLink = await mp3Links['128kbps']();
                await conn.sendMessage(m.chat, {
                    audio: { url: audioLink.url },
                    mimetype: 'audio/mpeg',
                }, { quoted: m });
                isMediaSent = true;
            }

            if (!isMediaSent) {
                await conn.sendMessage(m.chat, { 
                    text: 'Maaf, video 1080p dan audio tidak tersedia untuk video ini.' 
                }, { quoted: m });
            }
        } else if (result.type === 'search') {
            let message = `🔍 *Search Results for:* ${result.query}\n\n`;
            result.videos.forEach((video, i) => {
                message += `🎥 *${i + 1}*. [${video.title}](${video.url})\n`;
                message += `   ⏱ Duration: ${video.duration.timestamp} | Views: ${video.views}\n\n`;
            });
            await conn.sendMessage(m.chat, { text: message }, { quoted: m });
        }
    } catch (error) {
        await conn.sendMessage(m.chat, { text: `⚠️ Error: ${error.message}` }, { quoted: m });
    }
};

handler.help = ['ytmate'];
handler.tags = ['downloader'];
handler.limit = 3
handler.command = /^ytmate$/i;

module.exports = handler;