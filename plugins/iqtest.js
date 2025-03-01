const handler = async (m, { conn }) => {
    await delay(3000); // Menambahkan delay 3 detik
    conn.reply(m.chat, `${pickRandom(iq)}`, m);
};

handler.help = ['iqtest'];
handler.tags = ['game','fun'];
handler.command = /^(iqtest)$/i;
handler.limit = 3;

module.exports = handler;

function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())];
}

const iq = [
    'IQ Anda Sebesar : 1',
    'IQ Anda Sebesar : 14',
    'IQ Anda Sebesar : 23',
    'IQ Anda Sebesar : 35',
    'IQ Anda Sebesar : 41',
    'IQ Anda Sebesar : 50',
    'IQ Anda Sebesar : 67',
    'IQ Anda Sebesar : 72',
    'IQ Anda Sebesar : 86',
    'IQ Anda Sebesar : 99',
    'IQ Anda Sebesar : 150',
    'IQ Anda Sebesar : 340',
    'IQ Anda Sebesar : 423',
    'IQ Anda Sebesar : 500',
    'IQ Anda Sebesar : 676',
    'IQ Anda Sebesar : 780',
    'IQ Anda Sebesar : 812',
    'IQ Anda Sebesar : 945',
    'IQ Anda Sebesar : 1000',
    'IQ Anda Sebesar : Tidak Terbatas!',
    'IQ Anda Sebesar : 5000',
    'IQ Anda Sebesar : 7500',
    'IQ Anda Sebesar : 10000',
];

// Fungsi untuk menambahkan delay
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}