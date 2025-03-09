/*
Jangan Hapus Wm Bang 

*Download CC Plugins Esm*

No Wm Kyk nya Yang Penting Gak Nabrak CH Lain Nanti :)

*[Sumber]*
https://whatsapp.com/channel/0029Vb3u2awADTOCXVsvia28

*[Sumber Scrape]*

https://whatsapp.com/channel/0029VafnytH2kNFsEp5R8Q3n/274
*/

const axios = require('axios');

async function capcut(url) {
  let { data } = await axios.post('https://3bic.com/api/download', { url }, {
    headers: {
      "content-type": "application/json",
      "origin": "https://3bic.com",
      "referer": "https://3bic.com/",
      "user-agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Mobile Safari/537.36"
    }
  });
  data.originalVideoUrl = 'https://3bic.com' + data.originalVideoUrl;
  return data;
}

let handler = async (m, { args, conn }) => {
  if (!args[0]) return m.reply('Masukkan link Cangcut Woi');
  
  try {
    let res = await capcut(args[0]);
    await conn.sendMessage(m.chat, { video: { url: res.originalVideoUrl } }, { quoted: m });
  } catch (e) {
    m.reply('Gagal mengambil video. Pastikan link valid atau coba lagi nanti.');
  }
};

handler.help = ['capcut'];
handler.command = ['capcut'];
handler.tags = ['downloader']
handler.limit = 5;

module.exports = handler;
