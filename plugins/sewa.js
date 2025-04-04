let handler = async (m, { conn, usedPrefix }) => {
let text = `*_🟢 Open Sewa Bot WhatsApp_*

- *Rp 5,000* _18 Hari_
- *Rp 10,000* _36 Hari_
- *Rp 20,000* _54 Hari_
- *Rp 35,000* _Permanen_

 *Jika minat/mau tanya ² 👤*
 https://wa.me/6288228821913`
conn.sendFile(m.chat, 'https://files.catbox.moe/p452f2.jpg', '', text, m)
}
handler.help = ['sewa']
handler.tags = ['info','main']
handler.command = /^(sewa)$/i
handler.register = false

module.exports = handler
