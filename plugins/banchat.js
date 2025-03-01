let handler = async (m, { conn, participants }) => {
  // if (participants.map(v=>v.jid).includes(global.conn.user.jid)) {
    global.db.data.chats[m.chat].isBanned = true
    conn.reply(m.chat, 'Baiklah', m)
  // } else m.reply('There is a host number here...')
}
handler.command = /^banchat|botoff$/i
handler.help = ['banchat','botoff']
handler.tags = ['group']
handler.admin = true

module.exports = handler