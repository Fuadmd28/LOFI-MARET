const fetch = require('node-fetch');
 
let handler = async (m, { text, usedPrefix, command}) => {
 
if (!text) return m.reply('Text Input');
const apiUrl = `https://restapii.rioooxdzz.web.id/api/search-google?message=${encodeURIComponent(text)}`;
 
try {
    const response = await fetch(apiUrl);
    let result = await response.json();
    const results = result.data.response;
 
    if (results && results.length > 0) {
        m.reply(`Search: ${text}\n\n${results}`);
    } else {
        m.reply('Tidak ada hasil ditemukan.');
    }
} catch (error) {
    console.error(error);  // Log the error if any
    m.reply('Terjadi kesalahan saat mencari.');
}
}
handler.help = ['google'];
handler.tags = ['internet'];
handler.command = /^(search-google|google|ggsearch)$/i;
handler.limit = 3;
module.exports = handler;