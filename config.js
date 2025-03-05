global.owner = ['6282147781510','6281932471151']
global.mods = ['6282147781510'] 
global.prems = ['.']
global.nameowner = 'YTTA'
global.numberowner = '6282147781510'
global.nomorown = '6281932471151'
global.sgc = 'nekopoi.care'
global.namebot = '© 𝙇𝙊𝙁𝙄 𝙄𝙈𝙐𝙏𝙏 v5.0.3 (Public Bot)'
global.mail = 'support@tioprm.eu.org' 
global.gc = 'https://chat.whatsapp.com/JZr68dt7KlEKiJuvEmWxoX'
global.fotomu = 'https://pomf2.lain.la/f/cjvxzxjo.jpg'
global.menu = 'https://btch.pages.dev/file/ea9a7ed7ad210811c90ff.jpg' //image menu , but not work 
global.instagram = 'https://instagram.com/erlanrahmat_14'
global.wm = '© 𝙇𝙊𝙁𝙄 𝙄𝙈𝙐𝙏𝙏 💕'
global.wait = '_*Tunggu sedang di proses...*_'
global.eror = '_*Server Error*_'
global.stiker_wait = '*⫹⫺ Stiker sedang dibuat...*'
global.packname = 'Made With'
global.author = '𝙇𝙊𝙁𝙄 𝙄𝙈𝙐𝙏𝙏'
global.maxwarn = '2' // Peringatan maksimum

//INI WAJIB DI ISI!//
global.lann = 'nurfuad'
global.xzn = 'katz'
global.lol = 'bc131817e421982d74969fdb'
//Daftar terlebih dahulu https://api.betabotz.eu.org

//INI OPTIONAL BOLEH DI ISI BOLEH JUGA ENGGA//
global.btc = 'sunfuad'
//Daftar https://api.botcahx.eu.org 

global.APIs = {   
  lann: 'https://api.betabotz.eu.org',
  lol: 'https://api.lolhuman.xyz',
  alya: 'https://api.alyachan.dev',
  btc: 'https://api.botcahx.eu.org',
  xzn: 'https://skizo.tech'
}
global.APIKeys = { 
  'https://api.betabotz.eu.org': 'nurhasanah',
  'https://api.alyachan.dev': 'OQtXCT',
  'https://skizo.tech': 'katz',
  'https://api.botcahx.eu.org': 'APIKEY'
}

let fs = require('fs')
let chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  delete require.cache[file]
  require(file)
})
