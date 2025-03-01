/*
 • Fitur By Anomaki Team
 • Created : Nazand Code
 • Tiktok Search
 • Jangan Hapus Wm
 • https://whatsapp.com/channel/0029Vaio4dYC1FuGr5kxfy2l

Using Simple Api : Using Api : https://api-tts.anomaki.web.id/get-tiktok-video?query=
*/

const fetch = require('node-fetch');
let handler = async (m, { conn, text }) => {
    if (!text) throw 'Silakan masukkan kata kunci pencarian TikTok!'

    try {
        let apiUrl = `https://api-tts.anomaki.web.id/get-tiktok-video?query=${encodeURIComponent(text)}`
        let res = await fetch(apiUrl)
        if (!res.ok) throw await res.text()
        let result = await res.json()

        if (!result.video_url) throw 'Video tidak ditemukan atau API bermasalah.'

        let message = `
*🔍 Hasil Pencarian TikTok By Nekopoi*

📌 *Judul:* ${result.title}
🎵 *Musik:* ${result.music}
👤 *Author:* ${result.author}
`
        await conn.sendMessage(m.chat, {
            video: { url: result.video_url },
            caption: message,
            contextInfo: {
                externalAdReply: {
                    title: result.title,
                    body: `${result.author} - ${result.music}`,
                    thumbnailUrl: result.cover_image,
                    mediaType: 1,
                    sourceUrl: result.video_url
                }
            }
        }, { quoted: m })

    } catch (error) {
        console.error(error)
        throw 'Terjadi kesalahan saat mencari video TikTok. Silakan coba lagi nanti.'
    }
}

handler.help = ['tiktoksearch']
handler.tags = ['internet','downloader']
handler.limit = 4
handler.private = true
handler.command = /^(tiktoksearch|ttsearch)$/i
module.exports = handler