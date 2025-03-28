let {
    caklontong
} = require('@bochilteam/scraper')

let timeout = 120000
let poin = 4999
let handler = async (m, {
    conn,
    command,
    usedPrefix
}) => {

    conn.caklontong = conn.caklontong ? conn.caklontong : {}
    let id = m.chat
    if (id in conn.caklontong) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.caklontong[id][0])
        throw false
    }
    const json = await caklontong()
    let caption = `*${command.toUpperCase()}*
${json.soal}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hcak untuk bantuan
Bonus: ${poin} XP

*Note : Reply Pesan Ini Jika Ingin Menjawab Soal*
    `.trim()
    conn.caklontong[id] = [
        await m.reply(caption),
        json, poin,
        setTimeout(() => {
            if (conn.caklontong[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.caklontong[id][0])
            delete conn.caklontong[id]
        }, timeout)
    ]
}
handler.help = ['caklontong']
handler.tags = ['game']
handler.group = true
handler.limit = 7
handler.command = /^caklontong/i

module.exports = handler

const buttons = [
    ['Hint', '/hcak'],
    ['Nyerah', 'menyerah']
]
