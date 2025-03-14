let poin = 10000

const similarity = require('similarity')
const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    let users = global.db.data.users[m.sender]
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Ketik.*tela/i.test(m.quoted.text)) return !0
    this.tebakkalimat = this.tebakkalimat ? this.tebakkalimat : {}
    if (!(id in this.tebakkalimat)) return m.reply('Soal itu telah berakhir')
    if (m.quoted.id == this.tebakkalimat[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.tebakkalimat[id][1]))
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.tebakkalimat[id][2]
            users.money += poin
            m.reply(`*Benar!*\n+${this.tebakkalimat[id][2]} Kredit sosial`)
            clearTimeout(this.tebakkalimat[id][3])
            delete this.tebakkalimat[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) m.reply(`*Dikit Lagi!*`)
        else m.reply(`*Salah!*`)
    }
    return !0
}
handler.exp = 0

module.exports = handler