const axios = require('axios');
const FormData = require('form-data');

function randomNumber() {
  return Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
}

async function upscale(buffer) {
  let filename = randomNumber() + '.png';
  let formData = new FormData();
  formData.append('image', buffer, filename);

  let { data } = await axios.post('https://api.imggen.ai/guest-upload', formData, {
    headers: {
      ...formData.getHeaders(),
      origin: "https://imggen.ai",
      referer: "https://imggen.ai/",
      "user-agent": "Mozilla/5.0"
    }
  });

  let result = await axios.post('https://api.imggen.ai/guest-upscale-image', {
    image: {
      "url": "https://api.imggen.ai" + data.image.url,
      "name": data.image.name,
      "original_name": data.image.original_name,
      "folder_name": data.image.folder_name,
      "extname": data.image.extname
    }
  }, {
    headers: {
      "content-type": "application/json",
      origin: "https://imggen.ai",
      referer: "https://imggen.ai/",
      "user-agent": "Mozilla/5.0"
    }
  });

  return `https://api.imggen.ai${result.data.upscaled_image}`;
}

let handler = async (m, { conn }) => {
  try {
    // Kirim reaksi "⌛" untuk memberi tahu pengguna bahwa proses sedang berjalan
    await conn.sendMessage(m.chat, { react: { text: '⌛', key: m.key } });

    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';

    if (!mime.startsWith('image/')) {
      throw 'Silakan kirim gambar dengan caption *hd/remini* atau reply gambar!';
    }

    let media = await q.download();
    if (!media || !(media instanceof Buffer)) {
      throw 'Gagal mengunduh gambar atau format tidak valid.';
    }

    let upscaledUrl = await upscale(media);
    if (!upscaledUrl) throw 'Gagal melakukan upscale gambar.';

    // Kirim reaksi "✅" sebagai tanda sukses
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

    await conn.sendMessage(m.chat, {
      image: { url: upscaledUrl },
      caption: `*Done*`
    }, { quoted: m });

  } catch (error) {
    // Kirim reaksi "❌" jika terjadi error
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });

    await conn.reply(m.chat, `❌ *Error:* ${error.message || error}`, m);
  }
};

handler.help = ['hd'];
handler.tags = ['tools','ai'];
handler.limit = 9
handler.command = /^(hd)$/i;

module.exports = handler;
