let fetch = require('node-fetch')
let handler = async (m, { conn, text }) => {
try { 
let img = await fetch(`https://api.botcahx.eu.org/api/random/darkjokes?apikey=${btc}`).then(result => result.buffer())
await conn.sendFile(m.chat, img, 'file.jpg', wm, m)
} catch (e) {
throw `Error ${eror}`
 }
}
handler.command = /^(darkjokes|darkjoke)$/i
handler.tags = ['fun','internet']
handler.help = ['darkjokes']
handler.limit = 5
module.exports = handler
