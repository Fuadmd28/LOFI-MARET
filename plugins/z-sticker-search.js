const axios = require('axios');
const cheerio = require('cheerio');
const sharp = require('sharp');

const handler = async (m, { conn, args }) => {
    if (!args[0]) {
        return conn.reply(m.chat, 'Gunakan format: sticker-s <query> <page> <jumlah>', m);
    }

    const query = args[0];
    const page = args[1] ? parseInt(args[1]) : 1;
    const count = args[2] ? parseInt(args[2]) : 5;

    const surl = `https://getstickerpack.com/stickers?query=${encodeURIComponent(query)}&page=${page}`;

    try {
        const respon = await axios.get(surl);
        const $ = cheerio.load(respon.data);
        const stickerPacks = [];

        $('div.sticker-pack-cols a').each((i, el) => {
            const href = $(el).attr('href');
            if (href) stickerPacks.push(href);
        });

        if (stickerPacks.length === 0) {
            return conn.reply(m.chat, `Tidak ada sticker pack ditemukan untuk query "${query}".`, m);
        }

        const nzand = stickerPacks[Math.floor(Math.random() * stickerPacks.length)];
        const packRespon = await axios.get(nzand);
        const nzand2 = cheerio.load(packRespon.data);
        const stickers = [];

        nzand2('img.img-thumbnail.sticker-image').each((i, el) => {
            const stickerUrl = nzand2(el).attr('data-src-large') || nzand2(el).attr('src');
            if (stickerUrl) stickers.push(stickerUrl);
        });

        if (stickers.length === 0) {
            return conn.reply(m.chat, `Tidak ditemukan sticker pada pack ini untuk query "${query}".`, m);
        }

        const jumlah = stickers.length;
        const jmlah = Math.min(count, jumlah);

        conn.reply(m.chat, `Ditemukan ${jumlah} sticker. Mengirimkan ${jmlah} sticker...`, m);

        for (let i = 0; i < jmlah; i++) {
            const stickerUrl = stickers[i];
            const sp = await axios.get(stickerUrl, { responseType: 'arraybuffer' });

            const stickerBuffer = await sharp(Buffer.from(sp.data))
                .resize({ width: 512, height: 512 }) // Ukuran maksimal sticker
                .webp()
                .toBuffer();

            await conn.sendMessage(
                m.chat, 
                { sticker: stickerBuffer }, 
                { quoted: m }
            );
        }
    } catch (error) {
        conn.reply(m.chat, `Terjadi kesalahan: ${error.message}`, m);
    }
};

handler.help = ['sticker-s query page jumlah'];
handler.tags = ['tools','sticker'];
handler.command = /^sticker-s$/i;
handler.limit = 15;
handler.register = false;

module.exports = handler;
