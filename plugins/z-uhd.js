const axios = require('axios');
const cheerio = require('cheerio');

const handler = async (m, { conn, text }) => {
  if (!text) throw 'Apa yang kamu ingin cari? Contoh: .uhd anime\n\n*Yang Tersedia*\nanime\nnature\nmovie\nseries\ncomics\nfantasy\nanimals\ndigital art\nspace\nabstract\nscenery\nsci-fi';

  try {
    const wallpapers = await uhd(text);
    if (!wallpapers.length) throw 'Wallpaper tidak ditemukan!';
    const randomImage = wallpapers[Math.floor(Math.random() * wallpapers.length)];

    await conn.sendMessage(
      m.chat,
      {
        image: { url: randomImage.image },
        caption: 'Done 🎉',
      },
      { quoted: m }
    );
  } catch (e) {
    throw 'Wallpaper tidak ditemukan!.';
  }
};

async function uhd(query) {
  try {
    const response = await axios.get(`https://www.uhdpaper.com/search?q=${query}`, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    const $ = cheerio.load(response.data);
    const wallpapers = [];

    $('.post-outer').each((i, element) => {
      let imgUrl = $(element).find('img').attr('src');
      if (imgUrl.startsWith('https://img.uhdpaper.com')) {
        wallpapers.push({ image: imgUrl });
      }
    });

    return wallpapers;
  } catch (e) {
    console.error(e);
    return [];
  }
}

handler.help = ['uhd'];
handler.tags = ['ai'];
handler.limit = 4
handler.command = /^(uhd)$/i;

module.exports = handler;