let fetch = require('node-fetch');

let handler = async (m, { conn }) => {
  let res = await fetch('https://api.waifu.pics/sfw/waifu');
  if (!res.ok) throw await res.text();
  let json = await res.json();
  if (!json.url) throw 'Error!';
  conn.sendFile(m.chat, json.url, '', 'Here is your waifu', m);
};

handler.help = ['waifu'];
handler.tags = ['internet','anime'];
handler.limit = 4
handler.command = /^(waifu)$/i;
handler.private = true;

module.exports = handler;