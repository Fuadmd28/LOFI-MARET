let handler = async (m, { conn }) => {
  global.db.data.chats[m.chat].isBanned = false
  m.reply('Berhasil unbanned chat!')
}
handler.help = ['unbanchat','boton']
handler.tags = ['group']
handler.command = /^unbanchat|boton$/i
handler.admin = true

module.exports = handler