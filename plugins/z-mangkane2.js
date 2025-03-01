const fetch = require('node-fetch');

// Definisikan fkontak dan wm di sini
// Jika fkontak adalah detail kontak, Anda bisa mengisinya sesuai kebutuhan
const fkontak = { 
    "key": {
        "fromMe": false,
        "participant": "0@s.whatsapp.net",
        "remoteJid": "0@s.whatsapp.net"
    },
    "message": {
        "contactMessage": {
            "displayName": "Example Contact",
            "vcard": "BEGIN:VCARD\nVERSION:3.0\nN:;\nFN:Example Contact\nitem1.TEL;waid=1234567890:+1234567890\nitem1.X-ABLabel:Mobile\nEND:VCARD"
        }
    }
};

// Jika wm adalah watermark atau teks yang akan ditampilkan, definisikan juga
const wm = 'Your Watermark Here';

const handler = async (m, { conn, command }) => {
    m.reply('SIAP UNTUK DJ OM');
    let audio = `https://raw.githubusercontent.com/aisyah-rest/mangkane/main/Mangkanenya/${command}.mp3`;
    
    try {
        const thumbnail = await (await fetch('https://telegra.ph/file/0dd3974f6f589f500be54.png')).buffer();
        await conn.sendFile(m.chat, audio, 'error.mp3', null, fkontak, true, {
            type: 'audioMessage',
            ptt: false,
            seconds: 0,
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    mediaUrl: 'www.instagram.com/zzyko_04',
                    mediaType: 2,
                    description: 'www.instagram.com/zzyko_04',
                    title: "Now Playing...",
                    body: wm,
                    thumbnail: thumbnail,
                    sourceUrl: 'www.instagram.com/zzyko_04'
                }
            }
        });
    } catch (error) {
        console.error('Error in handler:', error);
        m.reply('Terjadi kesalahan saat mengirim file.');
    }
};

handler.help = ['mangkane25', 'mangkane26', 'mangkane27', 'mangkane28', 'mangkane29', 'mangkane30', 'mangkane31', 'mangkane32', 'mangkane33', 'mangkane34', 'mangkane35', 'mangkane36', 'mangkane37', 'mangkane38', 'mangkane39', 'mangkane40', 'mangkane41', 'mangkane42', 'mangkane43', 'mangkane44', 'mangkane45', 'mangkane46', 'mangkane47', 'mangkane48', 'mangkane49', 'mangkane50', 'mangkane51', 'mangkane52', 'mangkane53', 'mangkane54'];
handler.tags = ['sound'];
handler.command = /^(mangkane25|mangkane26|mangkane27|mangkane28|mangkane29|mangkane30|mangkane31|mangkane32|mangkane33|mangkane34|mangkane35|mangkane36|mangkane37|mangkane38|mangkane39|mangkane40|mangkane41|mangkane42|mangkane43|mangkane44|mangkane45|mangkane46|mangkane47|mangkane48|mangkane49|mangkane50|mangkane51|mangkane52|mangkane53|mangkane54)$/i;
handler.limit = true;

module.exports = handler;
