const fetch = require('node-fetch');

const handler = async (m, { conn }) => {
  let data = await (await fetch('https://raw.githubusercontent.com/ShirokamiRyzen/WAbot-DB/main/fitur_db/ppcp.json')).json();
  let cita = data[Math.floor(Math.random() * data.length)];

  let cowi = await (await fetch(cita.cowo)).buffer();
  await conn.sendFile(m.chat, cowi, '', 'cowok ♂️', m);

  // Menambahkan delay 3 detik sebelum mengirim gambar cewek
  setTimeout(async () => {
    let ciwi = await (await fetch(cita.cewe)).buffer();
    await conn.sendFile(m.chat, ciwi, '', 'cewek ♀️', m);
  }, 3000); // delay 3 detik (3000 ms)
};

handler.help = ['ppcp'];
handler.tags = ['anime','internet'];
handler.command = /^ppcp$/i;
handler.limit = 2;
handler.private = true

module.exports = handler;