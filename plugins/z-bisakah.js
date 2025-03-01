const pickRandom = (list) => {
  return list[Math.floor(Math.random() * list.length)];
};

// Fungsi untuk menambahkan delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const handler = async (m, { conn, command, text }) => {
  // Menunggu selama 4 detik
  await delay(4000);

  conn.reply(m.chat, `
*🌎Pertanyaan:* ${command} ${text}
*💬Jawaban:* ${pickRandom(['Iya', 'Bisa', 'Tentu saja bisa', 'Tentu bisa', 'Sudah pasti', 'Sudah pasti bisa', 'Tidak', 'Tidak bisa', 'Tentu tidak', 'Tentu tidak bisa', 'Sudah pasti tidak'])}
`.trim(), m);
};

// Menambahkan metadata untuk handler
handler.help = ['bisakah <pertanyaan>'];
handler.tags = ['kerang'];
handler.command = /^bisakah/i;
handler.limit = 3

module.exports = handler;
