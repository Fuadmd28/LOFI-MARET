// FITUR TEXT TO VOICE JEPANG
const fetch = require('node-fetch');

const defaultLang = 'jepang';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let text = args.join(' ');

    if (!text && m.quoted?.text) text = m.quoted.text;

    if (!text) {
        return m.reply(`Silakan masukkan teks yang ingin diubah ke suara. Contoh:\n*${usedPrefix + command} Halo sayang ku selamat datang*`);
    }
    /*
ini wm don't dete this wm
thanks to penyedia api
no delete wm👍
Pembuat : Haidar
ikuti saluran untuj fitur lain nya :v
https://whatsapp.com/channel/0029VamzFetC6ZvcD1qde90Z
*/

    try {
        await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key } });

        const translatedText = await translateToJapanese(text);
        const audioBuffer = await tts(translatedText, defaultLang);

        if (audioBuffer) {
            await conn.sendFile(m.chat, audioBuffer, 'tts.mp3', null, m, true);
        } else {
            throw new Error('Audio tidak tersedia');
        }

        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
    } catch (e) {
        console.error(e);
        m.reply(`Terjadi kesalahan: ${e.message}`);
        
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    }
};

async function translateToJapanese(text) {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=id|ja`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.responseData?.translatedText) {
            return data.responseData.translatedText;
        } else {
            throw new Error('Gagal menerjemahkan teks');
        }
    } catch (e) {
        throw new Error(`Terjadi kesalahan saat menerjemahkan teks: ${e.message}`);
    }
}

async function tts(text, lang = 'jepang') {
    const url = `https://mdsay.xyz/api/v1?key=md&api=${lang}&text=${encodeURIComponent(text)}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Gagal mengambil audio: ${response.statusText}`);
        return await response.buffer();
    } catch (e) {
        throw new Error(`Terjadi kesalahan saat memanggil API: ${e.message}`);
    }
}

handler.help = ['vnjepang'];
handler.tags = ['tools','ai'];
handler.command = /^vnjepang|vnjpn|vnjapan$/i;
handler.private = true
handler.limit = 4;

module.exports = handler;
/*
ini wm don't dete this wm
thanks to penyedia api
no delete wm👍
Pembuat : Haidar
ikuti saluran untuj fitur lain nya :v
https://whatsapp.com/channel/0029VamzFetC6ZvcD1qde90Z
*/