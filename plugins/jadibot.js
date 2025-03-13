let handler = async (m, { conn, usedPrefix }) => {
let text = `*_🟢 Open Jadi Bot WhatsApp_*

- *Rp 5,000* _15 Hari_
- *Rp 10,000* _30 Hari_
- *Rp 20,000* _45 Hari_
- *Rp 30,000* _60 Hari_
- *Rp 95,000* _Permanen_

 *_Note 📌_*
• Bisa Di Jual Kembali atau open sewa bot
• Bisa Jadi Owner bot
• Ubah Nama Di Bot Nya
• Bisa Ubah Gambar Yg Di Bot
• Ubah Link Group Yg Di Bot
• Bot Terus Di Update Kemungkinan Eror Berkurang 
• Request fitur bot
• Jika Eror Langsung Diperbaiki 
• Tidak perlu 2 hp untuk terhubung ke bot, hanya masukan code saja *( Aman )*
• Fresh Respon

 *_TESTIMONI 🛒🛍️_*
https://wa.me/p/6331501620289183/6282147781510

 *Jika minat/mau tanya ² 👤*
 https://wa.me/6282147781510`
conn.sendFile(m.chat, 'https://files.catbox.moe/p452f2.jpg', '', text, m)
}
handler.help = ['jadibot']
handler.tags = ['info','main']
handler.command = /^(jadibot)$/i
handler.register = false

module.exports = handler
