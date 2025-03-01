const pickRandom = (list) => {
  return list[Math.floor(Math.random() * list.length)];
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const handler = async (m, { conn, text, groupMetadata, usedPrefix, command }) => {
  if (!text) throw `Contoh:\n${usedPrefix + command} Alay`;

  // Menunggu selama 5 detik
  await delay(5000);

  const em = ['🥶', '🤨', '🗿', '🤔', '😫', '🤫', '🥴', '🤣', '😊', '😍'];
  const toM = a => '@' + a.split('@')[0];
  const ps = groupMetadata.participants.map(v => v.id);
  const a = pickRandom(ps);
  const am = pickRandom(em);
  
  conn.reply(m.chat, `Sii Paling *${text}* Adalah ${toM(a)} ${am}`, m, { mentions: [a] });
};

handler.help = ['sipaling']
handler.command = ['sipaling'];
handler.tags = ['fun'];
handler.limit = 3
handler.group = true;

module.exports = handler;
