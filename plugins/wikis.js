// * Code By Nazand Code
// * Fitur Wiki-Search (Dibuat Krn Gabut)
// * Hapus Wm Denda 500k Rupiah
// * https://whatsapp.com/channel/0029Vaio4dYC1FuGr5kxfy2l

const axios = require('axios');
const cheerio = require('cheerio');

const handler = async (m, { conn, text }) => {
  if (!text) {
    return await conn.sendMessage(
      m.chat,
      { text: "❗ Contoh: .wikis siapa presiden Russia" },
      { quoted: m }
    );
  }

  try {
    const searchUrl = `https://id.m.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
      text
    )}&format=json&utf8=1`;
    const searchResponse = await axios.get(searchUrl);
    const searchResults = searchResponse.data.query.search;

    if (searchResults.length === 0) {
      return await conn.sendMessage(
        m.chat,
        { text: "❗ Tidak ada hasil ditemukan di Wikipedia." },
        { quoted: m }
      );
    }
    const articleTitle = searchResults[0].title;
    const articleUrl = `https://id.m.wikipedia.org/wiki/${encodeURIComponent(articleTitle)}`;
    const articleResponse = await axios.get(articleUrl);
    const $ = cheerio.load(articleResponse.data);

    let articleContent = "";
    $('p').each((index, element) => {
      articleContent += $(element).text().trim() + "\n\n";
      if (index >= 4) return false;
    });

    const message = `📚 *Hasil Pencarian Wikipedia*\n\n` +
                    `🔍 *Judul*: ${articleTitle}\n` +
                    `📝 *Deskripsi Lengkap*:\n${articleContent}\n` +
                    `🌐 *Link*: [Klik di sini](${articleUrl})`;

    await conn.sendMessage(m.chat, { text: message }, { quoted: m });

  } catch (error) {
    console.error("Error fetching from Wikipedia:", error);
    await conn.sendMessage(
      m.chat,
      { text: "❗ Terjadi kesalahan saat mencari informasi di Wikipedia." },
      { quoted: m }
    );
  }
};

handler.command = /^(wikis)$/i;
handler.tags = ['internet'];
handler.help = ['wikis','katakunci'];
handler.limit = 1
module.exports = handler;