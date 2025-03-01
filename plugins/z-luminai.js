/* Thanks To Luminai
Create By Shina (ALC) 
Please Dont Delete Wm */
const axios = require('axios');

let handler = async (m, { conn, isOwner, usedPrefix, command, text }) => {
  if (!text) return m.reply("Iya Kak Apa Kabar 👋🏻");

  // Prompt untuk AI
  const prompt = ``//isi prompt lu
  
  const requestData = { content: text, user: m.sender, prompt: prompt };

  const quoted = m && (m.quoted || m);

  try {
    let response;
    // Jika ada gambar yang dikutip
    if (quoted && /image/.test(quoted.mimetype || quoted.msg?.mimetype)) {
      requestData.imageBuffer = await quoted.download();
    }

    
    response = (await axios.post('https://luminai.my.id', requestData)).data.result;

    
    await m.reply(`${response}`)
  } catch (e) {
    m.reply(`Terjadi kesalahan: ${e.message}`);
  }
};

handler.help = ['luminai','lofi'];
handler.tags = ['ai'];
handler.limit = 3
handler.premium = true
handler.command = /^(luminai|lofi)$/i;

module.exports = handler;