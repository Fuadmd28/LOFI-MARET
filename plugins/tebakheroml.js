const fs = require('fs');
let timeout = 120000;
let poin = 4999;

let handler = async (m, { conn, command, usedPrefix }) => {
    conn.game = conn.game ? conn.game : {};
    let id = 'tebakanml-' + m.chat;
    if (id in conn.game) return conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.game[id][0]);

    let src = JSON.parse(fs.readFileSync('./json/tebakanml.json', 'utf-8'));
    let json = src[Math.floor(Math.random() * src.length)];
    let caption = `
${json.soal}

Untuk Bantuan Ketik .tekml
Timeout *${(timeout / 1000).toFixed(2)} detik*
Bonus: ${poin} XP
    `.trim();

    conn.game[id] = [
        await m.reply(caption),
        json, poin,
        setTimeout(() => {
            if (conn.game[id]) {
                conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.game[id][0]);
            }
            delete conn.game[id];
        }, timeout)
    ];
};

handler.help = ['tebakheroml'];
handler.tags = ['game'];
handler.command = /^tebakheroml$/i;

handler.limit = 4;
handler.group = true;

module.exports = handler;