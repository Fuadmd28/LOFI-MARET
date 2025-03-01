let handler = async (m, { conn, usedPrefix }) => {
let text = `🟢 *_Open Panel Bot_*

- Ram 4GB Rp 4,000
- Ram 5GB Rp 5,000
- Ram 6GB Rp 6,000
- Ram 7GB Rp 7,000
- Ram 8GB Rp 8,000
- Ram 9GB Rp 9,000
- Unlimited Rp 12,000

_Note 📌_
- Membuat bot dengan mudah 
- Sudah ada tutorial nya jika bingung 
- Online 24 Jam
- Fresh Respon 
- Ada kendala atau eror sudah ada garansi
- Durasi 2 Bulan

 *_TESTIMONI 🛒🛍️_*
https://wa.me/p/6331501620289183/6282147781510

 *Jika minat/mau tanya ² 👤*
 wa.me/6282147781510`
conn.sendFile(m.chat, 'https://btch.pages.dev/file/2fd54032eb4ffb4f42ac6.jpg', '', text, m)
}
handler.help = ['panel']
handler.tags = ['info','main']
handler.command = /^(panel)$/i
handler.register = false

module.exports = handler