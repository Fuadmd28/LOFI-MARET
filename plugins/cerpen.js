/**
•  Plugins Cerpen
•  Source: https://whatsapp.com/channel/0029VakezCJDp2Q68C61RH2C
• Created By Shina
• Jangan Lupa Mampir: https://whatsapp.com/channel/0029VaNImZtKbYMRX8M08D08
*/
const cheerio = require('cheerio');
const axios = require('axios');

async function cerpen(category) {
    return new Promise((resolve, reject) => {
        let title = category.toLowerCase().replace(/[()*]/g, "");
        let judul = title.replace(/\s/g, "-");
        let page = Math.floor(Math.random() * 5);
        axios.get('http://cerpenmu.com/category/cerpen-' + judul + '/page/' + page)
            .then((get) => {
                let $ = cheerio.load(get.data);
                let link = [];
                $('article.post').each(function (a, b) {
                    link.push($(b).find('a').attr('href'));
                });
                let random = link[Math.floor(Math.random() * link.length)];
                axios.get(random)
                    .then((res) => {
                        let $$ = cheerio.load(res.data);
                        let hasil = {
                            title: $$('#content > article > h1').text(),
                            author: $$('#content > article').text().split('Cerpen Karangan: ')[1].split('Kategori: ')[0],
                            kategori: $$('#content > article').text().split('Kategori: ')[1].split('\n')[0],
                            lolos: $$('#content > article').text().split('Lolos moderasi pada: ')[1].split('\n')[0],
                            cerita: $$('#content > article > p').text()
                        };
                        resolve(hasil);
                    })
                    .catch((err) => reject(err));
            })
            .catch((err) => reject(err));
    });
}

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) {
        return m.reply(`Contoh penggunaan: ${usedPrefix + command} romantis`);
    }

    try {
        const hasil = await cerpen(text);

        const response = `
*📚 Judul:* ${hasil.title}
*✍️ Penulis:* ${hasil.author}
*🏷️ Kategori:* ${hasil.kategori}
*📆 Lolos Moderasi:* ${hasil.lolos}

*📖 Cerita:*
${hasil.cerita}
        `;

        m.reply(response);
    } catch (error) {
        console.error(error);
        m.reply('Terjadi kesalahan saat mengambil cerpen. Coba lagi nanti.');
    }
};

handler.help = ['cerpen'];
handler.tags = ['fun','internet'];
handler.limit = true;
handler.command = /^(cerpen)$/i;

module.exports = handler;
