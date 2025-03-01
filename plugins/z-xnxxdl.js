var fetch = require("node-fetch");
var handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw 'Masukkan Query Link!';
    try {
        // Memberi tahu pengguna bahwa proses sedang dimulai
        conn.sendMessage(m.chat, { text: 'Sedang memproses permintaan Anda, harap tunggu...' }, { quoted: m });

        // Mengambil data dari API
        let anu = await fetch(`https://api.botcahx.eu.org/api/download/xnxxdl?url=${text}&apikey=${btc}`);
        let hasil = await anu.json();

        // Mengirim video ke pengguna
        conn.sendMessage(m.chat, { video: { url: hasil.result.url }, fileName: 'xnxx.mp4', mimetype: 'video/mp4' }, { quoted: m });
    } catch (e) {
        // Menangani error
        throw `*Server error!*`;
    }
};

handler.command = handler.help = ['xnxxdown', 'xnxxdl'];
handler.tags = ['internet', 'premium', 'downloader'];
handler.premium = true;

module.exports = handler;
