let handler = async (m, { conn, usedPrefix }) => {
let text = `🟢 Premium Bot

• *16 Hari : 10.000*
• *28 Hari : 15.000*
• *40 Hari : 35.000*
• *52 Hari : 45,000*

*Keuntungan Premium*

> Unlimited Limit
> Akses Semua Fitur
> Pokoknya Gacor Kang
> Terbuka fitur 18+

 *Jika minat/mau tanya ² 👤*
 https://wa.me/6282147781510`
conn.sendFile(m.chat, 'https://files.catbox.moe/p452f2.jpg', '', text, m)
}
handler.help = ['premium']
handler.tags = ['info','main']
handler.command = /^(prem|premium)$/i
handler.register = false

module.exports = handler
