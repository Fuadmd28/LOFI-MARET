const yts = require('yt-search');

const handler = async (m, { conn, text }) => {
    if (!text) throw 'Masukkan judul';

    const src = await yts(text);
    const yt = src.videos[0];

    await conn.sendMessage(m.chat, { image: { url: yt.thumbnail }, caption: yt.title }, { quoted: m });
    return conn.sendMessage(m.chat, {
        audio: {
            url: `https://kepolu-ytdl.hf.space/yt/dl?url=${yt.url}&type=audio`
        },
        mimetype: 'audio/mpeg',
        contextInfo: {
            externalAdReply: {
                title: yt.title,
                body: 'PLAY AUDIO',
                mediaType: 2,
                mediaUrl: yt.url,
                thumbnailUrl: yt.thumbnail,
                sourceUrl: yt.url,
                containsAutoReply: true,
                renderLargerThumbnail: true,
                showAdAttribution: false,
            }
        }
    }, { quoted: m });
};

handler.help = ['play2'];
handler.command = ['play2'];
handler.limit = 7
handler.tags = ['downloader'];

module.exports = handler;
