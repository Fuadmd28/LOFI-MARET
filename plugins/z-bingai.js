/*
*<>BING AI REALTIME, SUPPORT SESI UNTUK MENGINGAT PERCAKAPAN SEBELUMNYA<>*
SOURCE REST API: https://whatsapp.com/channel/0029VaG1DsA2kNFtAcwamK13/430
SOURCE: https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
DON'T DELETE THIS WM!
HAPUS WM MANDUL 7 TURUNAN 
HAPUS WM=SDM RENDAH 
*KALO LU CONVERT APAPUN FITUR INI,WM JANGAN DIHAPUS!*
"aku janji tidak akan hapus wm ini"
MINGGU, 08 NOVEMBER 01:19
*/
const fetch = require('node-fetch');

let undefined = {};

const handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `Gunakan format:\n${usedPrefix + command} <pertanyaan>\n\nContoh:\n${usedPrefix + command} Apa itu AI?`;

  try {
    // Kirim pesan sementara
    m.reply('Sedang diproses pertanyaan kakak...');

    if (undefined[m.sender]) {
      text = `${undefined[m.sender]}\n${text}`; 
    }

    let url = `https://loco.web.id/wp-content/uploads/api/v1/bingai.php?q=${encodeURIComponent(text)}`;
    let response = await fetch(url);

    if (!response.ok) throw 'Gagal menghubungi API. Silakan coba lagi nanti.';

    let json = await response.json();

    if (!json.status || !json.result || !json.result.ai_response) {
      throw 'Maaf, tidak ada hasil yang relevan untuk pertanyaan Anda.';
    }

    let aiResponse = json.result.ai_response.trim();

    // Hapus pola seperti [^1^][1] dari teks jawaban
    aiResponse = aiResponse.replace(/\[\^.*?\^\]\[\d+\]/g, '');

    let searchResults = json.result.search_results || [];
    let firstResult = searchResults[0]; 

    let searchSummary = '';
    if (firstResult) {
      searchSummary = `**Hasil Pencarian:**\n${firstResult.title}\n[Link](${firstResult.url})`;
    }

    undefined[m.sender] = text;

    let resultMessage = `${aiResponse}\n\n${searchSummary}`;
    m.reply(resultMessage);
  } catch (err) {
    console.error(err);
    m.reply('Terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi nanti.');
  }
};

handler.help = ['bingai '];
handler.tags = ['internet','ai'];
handler.command = /^bingai$/i; 
handler.limit = 1 

module.exports = handler;

/*
*<>BING AI REALTIME, SUPPORT SESI UNTUK MENGINGAT PERCAKAPAN SEBELUMNYA<>*
SOURCE REST API: https://whatsapp.com/channel/0029VaG1DsA2kNFtAcwamK13/430
SOURCE: https://whatsapp.com/channel/0029VaJYWMb7oQhareT7F40V
DON'T DELETE THIS WM!
HAPUS WM MANDUL 7 TURUNAN 
HAPUS WM=SDM RENDAH 
*KALO LU CONVERT APAPUN FITUR INI,WM JANGAN DIHAPUS!*
"aku janji tidak akan hapus wm ini"
MINGGU, 08 NOVEMBER 01:19
*/