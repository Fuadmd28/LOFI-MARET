/*
*<>TEXTTOIMAGE AI<>*
SOURCE: https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
SCRAPE BY DAFFA: https://whatsapp.com/channel/0029VaiVeWA8vd1HMUcb6k2S/281
DON'T DELETE THIS WM!
HAPUS WM MANDUL 7 TURUNAN 
HAPUS WM=SDM RENDAH 
*KALO LU CONVERT APAPUN FITUR INI,WM JANGAN DIHAPUS!*
"aku janji tidak akan hapus wm ini"
KAMIS, 28 NOVEMBER 2024 19:30
*/
const axios = require('axios');
//scrape by Daffa https://whatsapp.com/channel/0029VaiVeWA8vd1HMUcb6k2S/281
const sanai = {
  create: async (
    prompt = "Daffa",
    weight = 1024,
    height = 1024,
    guiscale = 5,
    paguiscale = 2,
    nis = 18,
    step = 20,
    sid = -1
  ) => {
    const url = 'https://api.freesana.ai/v1/images/generate';

    const headers = {
      'authority': 'api.freesana.ai',
      'origin': 'https://freesana.ai',
      'referer': 'https://freesana.ai/',
      'user-agent': 'Postify/1.0.0',
    };

    const data = {
      prompt: prompt,
      model: "sana_1_6b",
      width: weight,
      height: height,
      guidance_scale: guiscale,
      pag_guidance_scale: paguiscale,
      num_inference_steps: nis,
      steps: step,
      seed: sid,
    };
//wm https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
    try {
      const response = await axios.post(url, data, { headers });
      const { id, status, result, processingTime, width, height, nsfw, seed } = response.data;
//wm https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
      return {
        id,
        status,
        result,
        processingTime,
        width,
        height,
        nsfw,
        seed,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
//wm https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
let handler = async (m, { conn, text, usedPrefix, command }) => {
text = m.quoted && m.quoted.text ? m.quoted.text : text
  if (!text) {
    return m.reply(`*Contoh*\n.texttoimg seorang wanita cantik di depan komputer dan rambut nya berwarna putih panjang`);
  }
//wm https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V

  m.reply('⏳ Sedang membuat gambar, mohon tunggu sebentar...');

  try {
//wm https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
    const response = await sanai.create(text);

    if (response && response.result) {
      const imageUrl = response.result;

     //wm https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
      await conn.sendFile(m.chat, imageUrl, 'generated-image.jpg', `✅ Gambar berhasil dibuat!\n\n• Prompt: *${text}*\n• Resolusi: ${response.width}x${response.height}\n• Waktu proses: ${response.processingTime} detik`, m);
    } else {
      m.reply('❌ Gagal membuat gambar. Silakan coba lagi.');
    }
  } catch (error) {
    console.error(error);
    m.reply('❌ Terjadi kesalahan saat membuat gambar. Silakan coba lagi nanti.');
  }
};

handler.help = ['texttoimg'];
handler.tags = ['tools','ai'];
handler.limit = 4
handler.command = /^(texttoimg)$/i;

module.exports = handler;
/*
*<>TEXTTOIMAGE AI<>*
SOURCE: https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
SCRAPE BY DAFFA: https://whatsapp.com/channel/0029VaiVeWA8vd1HMUcb6k2S/281
DON'T DELETE THIS WM!
HAPUS WM MANDUL 7 TURUNAN 
HAPUS WM=SDM RENDAH 
*KALO LU CONVERT APAPUN FITUR INI,WM JANGAN DIHAPUS!*
"aku janji tidak akan hapus wm ini"
KAMIS, 28 NOVEMBER 2024 19:30
*/