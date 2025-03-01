const fetch = require('node-fetch');

let handler = async (m, { conn, text }) => {
  let res = await fetch('https://katanime.vercel.app/api/getrandom?limit=1');
  if (!res.ok) throw await res.text();
  let json = await res.json();
  if (!json.result[0]) throw json;
  let { indo, character, anime } = json.result[0];
  await new Promise(resolve => setTimeout(resolve, 4000)); // delay 4 detik
  m.reply(`${indo}\n\n${character}\n${anime}`);
};

handler.help = ['kataanime'];
handler.tags = ['quotes'];
handler.command = /^(katanime|kataanime)$/i;
handler.limit = 3;

module.exports = handler;