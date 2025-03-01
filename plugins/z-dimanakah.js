const pickRandom = (list) => {
  return list[Math.floor(Math.random() * list.length)];
};

// Fungsi untuk menambahkan delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const handler = async (m, { conn, command, text }) => {
  // Menunggu selama 5 detik
  await delay(4000);

  conn.reply(m.chat, `
*Pertanyaan:* ${command} ${text}
*Jawaban:* ${pickRandom(['di neraka', 'di surga', 'di mars', 'di tengah laut', 'di dada :v', 'di hatimu >///<'])}
`.trim(), m, m.mentionedJid ? {
    contextInfo: {
      mentionedJid: m.mentionedJid
    }
  } : {});
};

handler.help = ['dimanakah <pertanyaan>'];
handler.tags = ['kerang','fun'];
handler.command = /^dimanakah$/i;
handler.limit = 3;

module.exports = handler;
