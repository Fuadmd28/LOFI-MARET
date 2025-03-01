const { promisify } = require('util');
const sleep = promisify(setTimeout);

const handler = async (m, { text, command, usedPrefix }) => {
    if (!text) throw `Use example ${usedPrefix}${command} Aku Tobrut?`;

    // Delay 3 detik
    await sleep(3000);

    const responses = [
        'Mungkin suatu hari',
        'Tidak juga',
        'Tidak keduanya',
        'Kurasa tidak',
        'Ya',
        'Coba tanya lagi',
        'Tidak ada'
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    m.reply(`"${randomResponse}."`);
};

handler.help = ['kerang', 'kerangajaib'].map(v => v + ' <teks>');
handler.tags = ['kerang', 'fun'];
handler.limit = 4;
handler.command = /^(kulit)?kerang(ajaib)?$/i;

module.exports = handler;