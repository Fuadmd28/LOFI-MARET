const fetch = require("node-fetch");

let handler = async (m, { text }) => {
    const prompt = 'hallo perkenalkan nama saya Rioo';
    if (!text) {
        return m.reply('Teksnya mana? Silakan masukkan teks.');
    }

    try {
        const response = await fetch(`https://restapii.rioooxdzz.web.id/api/gptlogic?message=${encodeURIComponent(text)}&prompt=${encodeURIComponent(prompt)}`);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const gpt = await response.json();
        if (!gpt.data || !gpt.data.response) {
            throw new Error('Invalid response from API.');
        }

        await m.reply(gpt.data.response);
    } catch (error) {
        console.error(error);
        await m.reply('Maaf, terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi nanti.');
    }
};

handler.command = ['logic'];
handler.help = ['logic'];
handler.tags = ['ai'];
handler.limit = 3 

module.exports = handler;