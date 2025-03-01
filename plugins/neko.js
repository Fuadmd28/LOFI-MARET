const fetch = require('node-fetch');

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

let handler = async (m, { conn, usedPrefix, command }) => {
    let res = await fetch(`https://api.waifu.pics/sfw/${command}`);
    if (!res.ok) throw await res.text();
    let json = await res.json();
    conn.sendFile(m.chat, json.url, null, `Nyaww~ 🐾💗 ${command.capitalize()}\n`, m);
};

handler.command = /^(neko)$/i;
handler.tags = ['anime'];
handler.help = ['neko'];
handler.limit = 2

module.exports = handler;