let { MessageType } = require('@adiwajshing/baileys')
let PhoneNumber = require('awesome-phonenumber')
let handler = async (m, { conn, usedPrefix, text, args, command }) => {
      let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:WhatsApp; Yang Mau Order Ke Sini\nORG:Yang Mau Order Ke Sini\nTITLE:soft\nitem1.TEL;waid=${nomorown}:${nomorown}\nitem1.X-ABLabel:Ponsel\nitem2.URL:http://github.com/AxellDxDs\nitem2.X-ABLabel:ðŸ’¬ More\nitem3.EMAIL;type=INTERNET:axellxyzz@gmail.com\nitem3.X-ABLabel:Email\nitem4.ADR:;;Indonesia;;;;\nitem4.X-ABADR:ðŸ’¬ More\nitem4.X-ABLabel:Lokasi\nEND:VCARD`;
      const sentMsg = await conn.sendMessage(
    m.chat,
    {
      contacts: {
        displayName: wm,
        contacts: [{ vcard }],
      },
      contextInfo: {
        externalAdReply: {
          title: "Itu Kak Pemilik Ku 😎🥶",
          body: "Version: 3.0.0",
          thumbnailUrl: 'https://telegra.ph/file/53dcb9ddfa3819318fd37.jpg',
          mediaType: 1,
          showAdAttribution: false,
          renderLargerThumbnail: true,
        },
      },
    },
    { quoted: m },
  );
}
handler.help = ['owner']
handler.tags = ['info']

handler.command = /^(owner)$/i

module.exports = handler