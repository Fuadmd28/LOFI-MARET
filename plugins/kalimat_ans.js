const similarity = require('similarity');
const threshold = 0.72;

async function before(m, { conn }) {
    const id = m.chat;

    if (
        !m.quoted || 
        !m.quoted.fromMe || 
        !m.quoted.isBaileys || 
        !m.text || 
        !/Ketik.*hkal/i.test(m.quoted.text) || 
        /.*hkal/i.test(m.text)
    ) {
        return true;
    }

    this.tebakkalimat = this.tebakkalimat || {};
    if (!(id in this.tebakkalimat)) {
        await conn.reply(m.chat, 'Soal itu telah berakhir', m);
        return true;
    }

    const quiz = this.tebakkalimat[id];
    if (m.quoted.id === quiz[0].id) {
        const isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text);
        if (isSurrender) {
            clearTimeout(quiz[3]);
            delete this.tebakkalimat[id];
            await conn.reply(m.chat, '*Yah Menyerah :( !*', m);
            return true;
        }

        const json = quiz[1];
        if (m.text.toLowerCase() === json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += quiz[2];
            await conn.reply(m.chat, `*Benar!*\n+${quiz[2]} XP`, m);
            clearTimeout(quiz[3]);
            delete this.tebakkalimat[id];
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) {
            await conn.reply(m.chat, '*Dikit Lagi!*', m);
        } else {
            await conn.reply(m.chat, '*Salah!*', m);
        }
    }
    return true;
}

const exp = 0;

module.exports = {
    before,
    exp
};