let handler = async (m, { conn, usedPrefix }) => {
let text = `*_🟢 Open Sewa Bot WhatsApp_*

- *Rp 10,000* _1 minggu_
- *Rp 30,000* _1 bulan_
- *Rp 50,000* _permanen_

 *Jika minat/mau tanya ² 👤*
 https://wa.me/c/6282338631264`
conn.sendFile(m.chat, 'https://files.catbox.moe/48no35.jpg', '', text, m)
}
handler.help = ['sewa']
handler.tags = ['info','main']
handler.command = /^(sewa)$/i
handler.register = false

module.exports = handler
