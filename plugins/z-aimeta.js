const fetch = require('node-fetch');

// PLUGINS
let handler = async (m, { text }) => {    
    if (!text) {
        // Gunakan m.reply untuk membalas jika text kosong
        return m.reply('Input teksnya!');
    }

    try {
        const apiUrl = `https://restapii.rioooxdzz.web.id/api/metaai?message=${encodeURIComponent(text)}`;
        const response = await fetch(apiUrl);
        const mark = await response.json();

        const ress = mark.result.meta || 'Maaf, saya tidak bisa memahami permintaan Anda.';
        
        // Kirim balasan menggunakan m.reply
        await m.reply(ress);

    } catch (error) {
        console.error("Terjadi kesalahan:", error.message);
        // Balas pesan kesalahan menggunakan m.reply
        await m.reply("Terjadi kesalahan saat memproses permintaan Anda.");
    }
};

handler.help = ['aimeta'];
handler.tags = ['ai'];
handler.limit = 4;
handler.command = /^(aimeta)$/i;

module.exports = handler;
