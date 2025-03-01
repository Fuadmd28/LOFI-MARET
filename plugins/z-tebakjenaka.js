let fetch = require('node-fetch')

let timeout = 100000
let poin = 500
let handler = async (m, { conn, usedPrefix }) => {
    conn.tebakjenaka = conn.tebakjenaka ? conn.tebakjenaka : {}
    let id = m.chat
    if (id in conn.tebakjenaka) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakjenaka[id][0])
        throw false
    }
    // di sini dia ngambil data dari api
    let src = await (await fetch(`https://api.botcahx.eu.org/api/game/tebakjenaka?apikey=${btc}`)).json()
    let json = src[Math.floor(Math.random() * src.length)]
    // buat caption buat di tampilin di wa
    let caption = `
${json.pertanyaan}

 *❔PERTANYAAN*
🕓 Timeout *${(timeout / 1000).toFixed(2)} detik*
🪄 Ketik ${usedPrefix}tbk untuk bantuan
🤑 Bonus: Dana 10,000
📌 *Balas/ replay soal ini untuk menjawab*
`.trim()
    conn.tebakjenaka[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.tebakjenaka[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.tebakjenaka[id][0])
            delete conn.tebakjenaka[id]
        }, timeout)
    ]
}
handler.help = ['tebakjenaka']
handler.tags = ['game']
handler.command = /^tebakjenaka/i
handler.limit = 5
handler.group = true

module.exports = handler

// tested di bileys versi 6.5.0 dan sharp versi 0.30.5
// danaputra133
