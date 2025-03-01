const handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, 'Masukkan teks pertanyaannya!', m);

  // Tambahkan delay 3 detik
  await new Promise(resolve => setTimeout(resolve, 3000));

  conn.reply(
    m.chat,
    `
*Pertanyaan:* ${text}
*Jawaban:* ${pickRandom(['Iya', 'Sudah pasti', 'Sudah pasti bisa', 'Tidak', 'Tentu tidak', 'Sudah pasti tidak'])}
`.trim(),
    m,
    {
      quoted: {
        key: { participant: '0@s.whatsapp.net' },
        message: {
          documentMessage: {
            title: 'wm',
            jpegThumbnail: Buffer.alloc(0),
          },
        },
      },
    }
  );
};

handler.help = ['benarkah'].map(v => v + ' <text>');
handler.tags = ['kerang','fun'];
handler.command = /^benarkah/i;
handler.limit = 4;

module.exports = handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}