const { generateWAMessageContent } = require("@adiwajshing/baileys");

let handler = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m;
    let mime = (m.quoted ? m.quoted : m.msg).mimetype || '';
    if (!/webp|image|video|gif|viewOnce/g.test(mime)) return m.reply(`Reply Media dengan perintah\n${usedPrefix + command}`);
    let media = await q.download?.();
    await m.reply(wait);

    try {
        let msg = await generateWAMessageContent({
            video: media
        }, {
            upload: conn.waUploadToServer
        });
        await conn.relayMessage(m.chat, {
            ptvMessage: msg.videoMessage
        }, {
            quoted: m
        });
    } catch (e) {
        try {
            let dataVideo = {
                ptvMessage: m.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage
            };
            await conn.relayMessage(m.chat, dataVideo, {});
        } catch (e) {
            await m.reply(eror);
        }
    }
};

handler.help = ['toptv'];
handler.tags = ['tools'];
handler.limit = true;
handler.command = /^(toptv)/i;

module.exports = handler;