const fs = require('fs');
const moment = require('moment-timezone');
const { dare } = require('@bochilteam/scraper');

// Fungsi untuk menambahkan delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let handler = async (m, { conn, usedPrefix, __dirname, text, command }) => {
  let tag = `@${m.sender.replace(/@.+/, '')}`;
  let mentionedJid = [m.sender];
  let name = conn.getName(m.sender);

  let flaaa2 = [
    'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=',
    'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=crafts-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&text=',
    'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=amped-logo&doScale=true&scaleWidth=800&scaleHeight=500&text=',
    'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text=',
    'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&fillColor1Color=%23f2aa4c&fillColor2Color=%23f2aa4c&fillColor3Color=%23f2aa4c&fillColor4Color=%23f2aa4c&fillColor5Color=%23f2aa4c&fillColor6Color=%23f2aa4c&fillColor7Color=%23f2aa4c&fillColor8Color=%23f2aa4c&fillColor9Color=%23f2aa4c&fillColor10Color=%23f2aa4c&fillOutlineColor=%23f2aa4c&fillOutline2Color=%23f2aa4c&backgroundColor=%23101820&text='
  ];

  // Menambahkan delay 4 detik
  await delay(5000);

  // Mengambil data dare
  let cin = await dare();
  let nth = '❲ *DARE* ❳';

  // Mengirimkan balasan ke chat
  m.reply(cin);
};

handler.help = ['dare'];
handler.tags = ['quotes'];
handler.command = /^(dare)$/i;
handler.limit = 3;

function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH');
  let res = "Selamat Malam";
  if (time >= 4) {
    res = "Selamat Pagi";
  }
  if (time >= 10) {
    res = "Selamat Siang";
  }
  if (time >= 15) {
    res = "Selamat Sore";
  }
  if (time >= 18) {
    res = "Selamat Malam";
  }
  return res;
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

module.exports = handler;
