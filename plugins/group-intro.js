let handler = async m => {

let intro = `╭──◈𝐈𝐍𝐓𝐑𝐎 𝐂𝐀𝐑𝐃◈
│🔗 *Nama* :
│🔗 *Umur* :
│🔗 *Kelas* :
│🔗 *Gender* :
│🔗 *Asal* :
╰─────────
 ©ᴀʀᴅ ɪɴᴛʀᴏ ʙʏ ᴏᴡɴ ᴍɪᴊᴏ`
m.reply(intro)
}
handler.command = /^(intro)$/i

module.exports = handler
