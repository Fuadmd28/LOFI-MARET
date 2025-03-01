const uploadImage = require('../lib/uploadImage.js');
const { Sticker } = require('wa-sticker-formatter');

const handler = async (m, { conn, text, usedPrefix, command }) => {
    let [atas, bawah] = text.split('|');
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';
    if (!mime) throw `Balas gambar dengan perintah\n\n${usedPrefix + command} <${atas ? atas : 'teks atas'}>|<${bawah ? bawah : 'teks bawah'}>`;
    if (!/image\/(jpe?g|png)/.test(mime)) throw `_*Mime ${mime} tidak didukung!*_`;
    m.reply('Tunggu sebentar...');
    let img = await q.download();
    let url = await uploadImage(img);
    let meme = `https://api.memegen.link/images/custom/${encodeURIComponent(atas ? atas : ' ')}${encodeURIComponent(bawah ? '/' + bawah : '')}.png?background=${url}`;
    let stiker = await createSticker(meme, false, '', '');
    await conn.sendFile(m.chat, stiker, '', '', m);
};

handler.help = ['smeme <text>|<text>'];
handler.tags = ['sticker'];
handler.command = /^(smeme)$/i;
handler.limit = 3;

module.exports = handler;

async function createSticker(img, url, packName, authorName, quality) {
    let stickerMetadata = {
        type: 'full',
        pack: packName,
        author: authorName,
        quality: quality || 100
    };
    return (new Sticker(img ? img : url, stickerMetadata)).toBuffer();
}
