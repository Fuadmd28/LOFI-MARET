/*
 • Fitur By Anomaki Team
 • Created : Nazand Code
 • Get random image BlueArchive
 • Jangan Hapus Wm
 • https://whatsapp.com/channel/0029Vaio4dYC1FuGr5kxfy2l

 Note: tenkyyuu api siput 🐌
*/

const fetch = require('node-fetch');

const handler = async (m, { conn }) => {
    try {
        const apiUrl = 'https://api.siputzx.my.id/api/r/blue-archive';
        const response = await fetch(apiUrl, {
            method: 'GET',
        });

        if (!response.ok) {
            return m.reply(`Gagal mengambil gambar dari API. Error: ${response.status} ${response.statusText}`);
        }

        const buffer = await response.buffer();

        await conn.sendMessage(
            m.chat,
            {
                image: buffer,
                caption: "Berikut gambar dari Blue Archive.",
            },
            {
                quoted: m,
            }
        );
    } catch (error) {
        m.reply(`Terjadi kesalahan saat mengambil gambar: ${error.message}`);
    }
};

handler.help = ['bluearchive','ba'];
handler.tags = ['internet','anime'];
handler.command = /^(bluearchive|ba)$/i;
handler.register = false;
handler.limit = 5;

module.exports = handler;
