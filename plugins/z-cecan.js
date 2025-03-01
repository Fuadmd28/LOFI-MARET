const axios = require('axios');

// Fungsi untuk menambahkan delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const handler = async (m, { conn, command }) => {
  // Menunggu selama 4 detik
  await delay(4000);

  // Mengambil data dari API
  let url = await axios.get('https://raw.githubusercontent.com/veann-xyz/result-daniapi/main/cecan/cecan.json');
  
  // Memilih gambar acak dari data yang diterima
  let image = pickRandom(url.data);

  // Mengirim gambar ke chat
  conn.sendFile(m.chat, image, 'cecan.jpeg', null, m, false);
};

// Fungsi untuk memilih elemen acak dari array
const pickRandom = (list) => {
  return list[Math.floor(Math.random() * list.length)];
};

// Metadata untuk handler
handler.help = ['cecan'];
handler.tags = ['internet'];
handler.command = /^(cecan)$/i;
handler.limit = 2;

// Mengekspor handler
module.exports = handler;
