const fetch = require('node-fetch');

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `*Example:* ${usedPrefix}${command} https://www.mediafire.com/file/941xczxhn27qbby/GBWA_V12.25FF-By.SamMods-.apk/file`;
    const q = await encodeURIComponent(args[0]);
    try {
        const response = await fetch(`https://api.botcahx.eu.org/api/download/mediafire?url=${q}&apikey=${btc}`);
        const json = await response.json();
        
        if (!json.result) throw 'Failed to fetch!';
        
        let { url, filename, ext, upload_date: aploud, filesize, filesizeH } = json.result;
        
        let caption = `
*💌 Name:* ${filename}
*📊 Size:* ${filesizeH}
*🗂️ Extension:* ${ext}
*📨 Uploaded:* ${aploud}
`.trim();
        
        m.reply(caption);
        conn.sendMessage(m.chat, { document: { url: url }, mimetype: ext, fileName: filename }, { quoted: m });
        
    } catch (e) {
        throw eror
    }
};

handler.help = ['mediafire']
handler.tags = ['downloader'];
handler.command = /^(mediafire|mf)$/i;

handler.limit = 10;

module.exports = handler;
