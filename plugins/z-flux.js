/*
*<>FLUX, IMAGE AI<>*
SCRAPE BY DAFFA: https://whatsapp.com/channel/0029VaiVeWA8vd1HMUcb6k2S/244
SOURCE: https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
DON'T DELETE THIS WM!
HAPUS WM MANDUL 7 TURUNAN 
HAPUS WM=SDM RENDAH
*KALO LU CONVERT APAPUN FITUR INI,WM JANGAN DIHAPUS!*
"aku janji tidak akan hapus wm ini"
JUM'AT, 06 NOVEMBER 16:42
*/

const axios = require("axios");

//wm https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(
      m.chat,
      `Kirim perintah dengan format: ${usedPrefix}${command} <prompt>\n\nContoh: ${usedPrefix}${command} Seorang gadis seperti karakter anime di depan komputer memiliki rambut putih seperti seorang gamer`,
      m
    );
  }

  // Memberikan notifikasi bahwa proses sedang berjalan
  await conn.reply(m.chat, "⚙️ Sedang memproses permintaan Anda, mohon tunggu...", m);

  try {
    const result = await fluximg.create(text);
    if (result && result.imageLink) {
      // Mengirim hasil jika berhasil
      await conn.sendMessage(
        m.chat,
        {
          image: { url: result.imageLink },
          caption: `✅ *Hasil Flux:*\n\nPrompt: ${text}`,
        },
        { quoted: m }
      );
    } else {
      throw new Error("Gagal membuat gambar. Coba lagi.");
    }
  } catch (error) {
    console.error(error);
    conn.reply(
      m.chat,
      "❌ Terjadi kesalahan saat membuat gambar. Silakan coba lagi nanti.",
      m
    );
  }
};

//wm https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
handler.help = ["flux"];
handler.tags = ["tools","ai"];
handler.limit = 5
handler.private = true
handler.command = ["flux"];
module.exports = handler;

//wm https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
//scrape by Daffa: https://whatsapp.com/channel/0029VaiVeWA8vd1HMUcb6k2S/244
const fluximg = {
  defaultRatio: "2:3", 

  create: async (query) => {
    const config = {
      headers: {
        accept: "*/*",
        authority: "1yjs1yldj7.execute-api.us-east-1.amazonaws.com",
        "user-agent": "Postify/1.0.0",
      },
    };

    try {
      const response = await axios.get(
        `https://1yjs1yldj7.execute-api.us-east-1.amazonaws.com/default/ai_image?prompt=${encodeURIComponent(
          query
        )}&aspect_ratio=${fluximg.defaultRatio}`,
        config
      );
      return {
        imageLink: response.data.image_link,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
/*
*<>FLUX, IMAGE AI<>*
SCRAPE BY DAFFA: https://whatsapp.com/channel/0029VaiVeWA8vd1HMUcb6k2S/244
SOURCE: https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
DON'T DELETE THIS WM!
HAPUS WM MANDUL 7 TURUNAN 
HAPUS WM=SDM RENDAH 
*KALO LU CONVERT APAPUN FITUR INI,WM JANGAN DIHAPUS!*
"aku janji tidak akan hapus wm ini"
JUM'AT, 06 NOVEMBER 16:42
*/