const { quotes } = require('../lib/scrape')

// Fungsi untuk menambahkan delay
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

let handler = async (m, { conn, usedPrefix, command, args }) => {
  // Pesan contoh dan pilihan
  let exampleMessage = `Contoh:\n${usedPrefix + command} cinta

╔═〘 Pilihan 〙
╟ cinta
╟ rindu
╟ mimpi
╟ sendiri
╟ sabar
╟ kesedihan
╟ pernikahan
╟ kemerdekaan
╚════`.trim()

  // Cek apakah argumen diberikan
  if (!args[0]) {
    return conn.reply(m.chat, exampleMessage, m)
  }

  // Normalisasi argumen
  let category = args[0].toLowerCase()
  const validCategories = ['cinta', 'rindu', 'mimpi', 'sendiri', 'sabar', 'kesedihan', 'pernikahan', 'kemerdekaan']

  // Cek apakah kategori valid
  if (!validCategories.includes(category)) {
    return conn.reply(m.chat, exampleMessage, m)
  }

  try {
    // Menambahkan delay 4 detik
    await delay(4000)

    // Mengambil kutipan dari fungsi quotes
    let res = await quotes(category)
    // Asumsikan res adalah array objek kutipan
    let randomIndex = Math.floor(Math.random() * res.data.length)
    let result = res.data[randomIndex]
    let { author, bio, quote } = result

    // Mengirimkan balasan ke chat
    await conn.reply(m.chat, `“${quote}”\n${author} - ${bio}`, m)
  } catch (error) {
    // Menangani kesalahan jika terjadi
    console.error('Error fetching quotes:', error)
    await conn.reply(m.chat, 'Terjadi kesalahan saat mengambil kutipan. Silakan coba lagi nanti.', m)
  }
}

handler.help = ['katabijak']
handler.tags = ['quotes']
handler.command = /^(katabijak)$/i
handler.limit = 4

module.exports = handler
