const axios = require('axios');
const cheerio = require('cheerio');

const handler = async (m, { text, args, usedPrefix, command, conn }) => {
    try {
        m.reply(`Hello, the command ${command} has been executed. Enjoy!`);

        let cr = await xhentai();
        if (!cr || cr.length === 0) {
            return m.reply("Tidak ada hasil yang ditemukan.");
        }

        let tan = cr[Math.floor(Math.random() * cr.length)];
        let vap = `
⭔ Title : ${tan.title}
⭔ Category : ${tan.category}
⭔ Mimetype : ${tan.type}
⭔ Views : ${tan.views_count}
⭔ Shares : ${tan.share_count}
⭔ Source : ${tan.link}
⭔ Media Url : ${tan.video_1}
`;

        await conn.sendMessage(m.sender, { 
            video: { url: tan.video_1 }, 
            caption: vap 
        }, { quoted: m });

    } catch (error) {
        console.error(error);
        m.reply("Terjadi kesalahan dalam mengambil data.");
    }
};

handler.help = ['vidhentai'];
handler.command = /^(vidhentai)$/i;
handler.tags = ['anime', 'premium'];
handler.premium = true;
handler.limit = true;

module.exports = handler;

async function xhentai() {
    try {
        const page = Math.floor(Math.random() * 1153);
        const response = await axios.get(`https://sfmcompile.club/page/${page}`);
        const $ = cheerio.load(response.data);
        const hasil = [];

        $('#primary > div > div > ul > li > article').each((_, b) => {
            hasil.push({
                title: $(b).find('header > h2').text(),
                link: $(b).find('header > h2 > a').attr('href'),
                category: $(b).find('header > div.entry-before-title > span > span').text().replace('in ', ''),
                share_count: $(b).find('header > div.entry-after-title > p > span.entry-shares').text(),
                views_count: $(b).find('header > div.entry-after-title > p > span.entry-views').text(),
                type: $(b).find('source').attr('type') || 'image/jpeg',
                video_1: $(b).find('source').attr('src') || $(b).find('img').attr('data-src'),
                video_2: $(b).find('video > a').attr('href') || ''
            });
        });

        return hasil;
    } catch (error) {
        console.error(error);
        return [];
    }
}
