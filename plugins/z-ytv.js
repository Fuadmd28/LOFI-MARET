const axios = require('axios');

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Masukan URL!\n\ncontoh:\n${usedPrefix + command} https://youtu.be/4rDOsvzTicY?si=3Ps-SJyRGzMa83QT`;    
  
        if (!text) throw 'masukan link youtube';   
        m.reply(wait);      
        const response = await axios.get(`https://api.botcahx.eu.org/api/dowloader/yt?url=${encodeURIComponent(text)}&apikey=${btc}`);       
        const res = response.data.result;      
        var { mp4, id, title, source, duration } = res;
        let capt = `YT MP4*\n\n`;
        capt += `◦ *id* : ${id}\n`;
        capt += `◦ *tittle* : ${title}\n`;
        capt += `◦ *source* : ${source}\n`;
        capt += `◦ *duration* : ${duration}\n`;
        capt += `\n`;        
        // await conn.sendFile(m.chat, mp4, null, capt, m);
        await conn.sendMessage(m.chat, { 
            document: { url: mp4 }, 
            mimetype: 'video/mp4',
            fileName: `${title}##.mp4`,
            caption: capt
        }, { quoted: m });
   
};
handler.help = ['ytmp4','ytv'];
handler.command = /^(ytmp4|ytv)$/i
handler.tags = ['downloader'];
handler.limit = 4;
handler.group = false;
handler.premium = false;
handler.owner = false;
handler.admin = false;
handler.botAdmin = false;
handler.fail = null;
handler.private = false;

module.exports = handler;
