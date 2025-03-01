// * Code By Nazand Code
// * Fitur Ai-simple (Dibuat Krn Gabut)
// * Hapus Wm Denda 500k Rupiah
// * https://whatsapp.com/channel/0029Vaio4dYC1FuGr5kxfy2l

const axios = require('axios');
async function getAIResponse(userid, text, model = "gpt-4o-mini") {
  try {
    const response = await axios.post("https://luminai.my.id/v2", {
      text: text,
      model: model
    });

    return response.data.reply.reply
  } catch (error) {
    console.error("Error while fetching AI response:", error.message);
    throw new Error("Failed to get a response from the AI.");
  }
}

// Gambar
const customImageUrl = "https://files.catbox.moe/sx7ti3.jpg";
const handler = async (m, { conn, args }) => {
  try {
    const userId = m.sender;
    const userText = args.join(" ");

    if (!userText) {
      return conn.sendMessage(m.chat, { text: "contoh\n.ais Cute anime girl" }, { quoted: m });
    }

    const aiResponse = await getAIResponse(userId, userText);
    const messageContent = `*🤖 AI Response:*\n\n${aiResponse}\n\n*©NazandCodes*`;
    await conn.sendMessage(m.chat, {
      image: { url: customImageUrl },
      caption: messageContent
    }, { quoted: m });

  } catch (error) {
    console.error("Error:", error.message);
    await conn.sendMessage(m.chat, { text: `⚠️ Error: ${error.message}` }, { quoted: m });
  }
};
handler.help = ['ais query'];
handler.tags = ['ai'];
handler.command = /^ais$/i;
handler.limit = 4;
module.exports = handler;