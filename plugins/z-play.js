let search = require("yt-search");
let axios = require("axios");

let handler = async (m, { conn, text, usedPrefix }) => {
    if (!text) throw '⚠️ Masukkan Judul atau Link YouTube!';
    try {
        // Kirim pesan status ke user
        conn.reply(m.chat, '⏳ Sebentar kak, sedang diproses...', m);

        const look = await search(text);
        const convert = look.videos[0];
        if (!convert) throw '❌ Video/Audio Tidak Ditemukan!';
        if (convert.seconds >= 3600) {
            return conn.reply(m.chat, '⏳ Maaf, video lebih dari 1 jam tidak bisa diunduh!', m);
        }

        let audioUrl;
        try {
            audioUrl = await youtube(convert.url);
        } catch (e) {
            conn.reply(m.chat, '⏳ Proses sedikit lebih lama, tunggu ya kak...', m);
            audioUrl = await youtube(convert.url);
        }

        let caption = `
🎵 *Judul*: ${convert.title}
⏱️ *Durasi*: ${convert.timestamp}
👀 *Penonton*: ${convert.views}
📅 *Diunggah*: ${convert.ago}
👤 *Author*: ${convert.author.name}
🔗 *URL*: ${convert.url}
📜 *Deskripsi*: ${convert.description}
        `.trim();

        await conn.relayMessage(m.chat, {
            extendedTextMessage: {
                text: caption,
                contextInfo: {
                    externalAdReply: {
                        title: convert.title,
                        mediaType: 1,
                        renderLargerThumbnail: true,
                        thumbnailUrl: convert.image,
                        sourceUrl: audioUrl.mp3
                    }
                }
            }
        }, {});

        await conn.sendMessage(m.chat, {
            audio: {
                url: audioUrl.result.mp3
            },
            mimetype: 'audio/mpeg',
            contextInfo: {
                externalAdReply: {
                    title: convert.title,
                    body: "",
                    thumbnailUrl: convert.image,
                    sourceUrl: audioUrl.mp3,
                    mediaType: 1,
                    showAdAttribution: true,
                    renderLargerThumbnail: true
                }
            }
        }, {
            quoted: m
        });

        // Pesan selesai
        conn.reply(m.chat, '✅ Proses selesai! Audio sudah dikirim.', m);

    } catch (e) {
        conn.reply(m.chat, `❌ *Error:* ${e.message}`, m);
    }
};

handler.command = handler.help = ['play', 'ds', 'song'];
handler.tags = ['downloader'];
handler.exp = 0;
handler.limit = 50;
handler.private = false;

module.exports = handler;

async function youtube(url) {
   try {
       const { data } = await axios.get("https://api.botcahx.eu.org/api/download/yt?url=" + url + "&apikey=" + btc);
       return data;
   } catch (e) {
       throw new Error('Error mengambil data dari API YouTube.');
   }
}
