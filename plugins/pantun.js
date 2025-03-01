const axios = require('axios');

let handler = async (m) => {
    try {
        let response = await axios.get('https://raw.githubusercontent.com/IdkJhus/JhuszBotV1/main/node_modules/ra-api/lib/database/pantun.json');
        let pantunList = response.data; // Mendapatkan daftar pantun dari respons

        // Memilih secara acak satu pantun dari daftar
        let randomIndex = Math.floor(Math.random() * pantunList.length);
        let randomPantun = pantunList[randomIndex];

        m.reply(randomPantun.trim());
    } catch (error) {
        console.error(error);
        m.reply('Terjadi kesalahan saat memuat pantun.');
    }
};

handler.help = ['pantun'];
handler.tags = ['quotes'];
handler.limit = 3
handler.command = /^(pantun)$/i;

module.exports = handler;