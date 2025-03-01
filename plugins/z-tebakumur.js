// Fungsi untuk menambahkan delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Daftar umur untuk dipilih secara acak
const umur = [
  '12 Tahun, Masih Bocil',
  '11 Tahun, Bocilll',
  '10 Tahun, Aduh Masih Gaboleh Main Hp Dek',
  '16 Tahun, Remaja Lah Ya',
  '19 Tahun, Remajaa',
  '20 Tahun, Udah Nikah?',
  '21 Tahun, Udah Ketemu Calon Nih?',
  '14 Tahun',
  '15 Tahun',
  '17 Tahun',
  '18 Tahun, Udah Balig Nih'
];

// Fungsi untuk memilih elemen acak dari array
const pickRandom = (list) => {
  return list[Math.floor(Math.random() * list.length)];
};

// Handler utama
const handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, 'Masukan Namamu', m);

  // Menunggu selama 4 detik
  await delay(4000);

  // Mendapatkan umur acak dari daftar
  let age = pickRandom(umur);
  
  // Mengirim balasan
  m.reply(`Nama Kamu: ${text}\nUmur ${age}`);
};

// Metadata untuk handler
handler.help = ['tebakumur'].map(v => v + ' <name>');
handler.tags = ['fun'];
handler.command = /^(tebakumur)$/i;

// Mengekspor handler
module.exports = handler;
