const uploadFile = require('../lib/uploadFile.js');
const uploadImage = require('../lib/uploadImage.js');
const fetch = require('node-fetch');

let handler = async function (m, { conn }) {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';
  
  if (!mime) throw 'No media found';
  
  // Menampilkan pesan bahwa proses telah dimulai
  await conn.sendMessage(m.chat, { text: 'Proses mengubah foto ke anime dimulai...' }, { quoted: m });

  let media = await q.download();
  let isTele = /image/.test(mime);
  let link = await (isTele ? uploadImage : uploadFile)(media);
  let ress = await fetch(`https://api.zenkey.my.id/api/maker/toanime?apikey=zenkey&url=${link}`);
  
  let tag = `@${m.sender.split("@")[0]}`;
  let caption = `Nih effect *photo-to-anime* nya\nRequest by: ${tag}`;
  
  // Mengirim hasil kepada pengguna
  await conn.sendMessage(m.chat, { image: ress, caption, mentions: [m.sender] }, { quoted: m });

  // Menampilkan pesan bahwa proses telah selesai
  await conn.sendMessage(m.chat, { text: 'Proses selesai! Silakan lihat hasilnya.' }, { quoted: m });
};

handler.help = ["jadianime","toanime"]
handler.tags = ["ai","anime"];
handler.premium = false
handler.command = /^(jadianime|toanime)$/i;

module.exports = handler;