const axios = require('axios');
const cheerio = require('cheerio');

async function aoirandom(jumlah) {
    const url = 'https://aoi.live';
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const img = [];
        const judul = [];
        const like = [];

        $('img.post-image').each((index, element) => {
            const imags = $(element).attr('src');
            if (imags) {
                img.push(imags);
            }
        });

        $('div[data-v-3b96c720]').each((index, element) => {
            const title = $(element).text().trim();
            if (title) {
                judul.push(title);
            }
        });

        $('div.num-text').each((index, element) => {
            const jumlhlik = $(element).text().trim();
            if (jumlhlik) {
                like.push(jumlhlik);
            }
        });

        const randomimg = [];
        const judule = [];
        const jmlhlike = [];
        while (randomimg.length < jumlah && img.length > 0 && judul.length > 0 && like.length > 0) {
            const ri = Math.floor(Math.random() * img.length);
            randomimg.push(img.splice(ri, 1)[0]);
            judule.push(judul.splice(ri, 1)[0]);
            jmlhlike.push(like.splice(ri, 1)[0]);
        }

        return randomimg.map((img, index) => ({
            image: img,
            title: judule[index] || 'No title',
            likeCount: jmlhlike[index] || '0'
        }));
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

const handler = async (m, { text, conn, command }) => {
    const jumlah = text ? parseInt(text) : 1;
    const results = await aoirandom(jumlah);

    if (results.length > 0) {
        for (let result of results) {
            await conn.sendMessage(m.chat, {
                image: { url: result.image },
                caption: `Judul: ${result.title}\nLike: ${result.likeCount}`,
            }, { quoted: m });
        }
    } else {
        m.reply('Tidak ada gambar.');
    }
};

handler.help = ['waifuaoi'];
handler.tags = ['anime'];
handler.command = /^waifuaoi/i;
handler.limit = 5;

module.exports = handler;
