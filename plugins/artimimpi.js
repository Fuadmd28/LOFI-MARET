const { tafsir_mimpi } = require('../lib/scrapee.js');
let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(`Masukan Mimpi Yang Ingin Dicari!\n\nContoh:\n${usedPrefix + command} buaya`);
    
    let res = await tafsir_mimpi(text);
    if (!res.status) throw res.message;
    
    let cap = `
*Mimpi:* ${res.message.mimpi}
*Arti:* ${res.message.arti}
`.trim();
    
    m.reply(cap);
};

handler.help = ['artimimpi'];
handler.tags = ['primbon'];
handler.limit = 4
handler.command = /^artimimpi$/i;

module.exports = handler;
