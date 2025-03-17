let handler = async (m, { conn, usedPrefix }) => {
let text = `*_🟢 Open Nokos_*

*🇮🇩Indonesia* _Rp 5,000_
*🇲🇾Malaysia* _Rp 9,000_
*🇷🇺Russia* _Rp 21,000_
*🇨🇳China* _Rp 19,000_
*🇺🇸USA* _Rp 13,000_
*🇮🇳India* _Rp 11,000_
*🇹🇭Thailand* _Rp 10,000_
*🇵🇭Filipina* _Rp 6,000_
*🇧🇷Brazil* _Rp 13,000_

 *Jika minat/mau tanya ² 👤*
 https://wa.me/6282147781510`
conn.sendFile(m.chat, 'https://i.supa.codes/ydtRAb', '', text, m)
}
handler.help = ['nokos']
handler.tags = ['info','main']
handler.command = /^(nokos)$/i
handler.register = false

module.exports = handler
