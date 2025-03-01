/*
 • Fitur By Anomaki Team
 • Created : Nazand Code
 • Contributor By : Shannz (Scrape) 
 • Pinterest Downloader
 • Jangan Hapus Wm
 • https://whatsapp.com/channel/0029Vaio4dYC1FuGr5kxfy2l

   Note: Dibuat saat buru-buru
*/

const fetch = require('node-fetch');
const cheerio = require('cheerio');

// Fungsi untuk mengunduh media dari Pinterest
async function pindl(url) {
    try {
        const response = await fetch(`https://www.savepin.app/download.php?url=${url}&lang=en&type=redirect`);
        const body = await response.text();
        const $ = cheerio.load(body);
        const results = [];
        
        const mediaTable = $('table');
        mediaTable.each((index, table) => {
            $(table).find('tr').each((_, row) => {
                const quality = $(row).find('.video-quality').text().trim();
                const format = $(row).find('td:nth-child(2)').text().trim();
                const downloadLink = $(row).find('a').attr('href');

                if (quality && downloadLink) {
                    const type = format.toLowerCase().includes('mp4') ? 'video' : 'image';
                    results.push({
                        type,
                        quality,
                        format,
                        media: /^http/.test(downloadLink) ? downloadLink : `https://www.savepin.app/${downloadLink}`,
                    });
                }
            });
        });

        if (results.length === 0) {
            return { message: 'Tidak ada media yang ditemukan.' };
        }

        return { results };
    } catch (error) {
        return { error: 'Error fetching media data: ' + error.message };
    }
}

// Handler untuk menangani perintah 'pindl'
const handler = async (m, { text, conn }) => {
    if (!text) {
        return conn.sendMessage(m.chat, {
            text: 'URL yang diberikan harus valid.',
        }, { quoted: m });
    }

    try {
        const data = await pindl(text);

        if (data.error) {
            return conn.sendMessage(m.chat, {
                text: `${data.error}`,
            }, { quoted: m });
        }

        if (data.results.length === 0) {
            return conn.sendMessage(m.chat, {
                text: 'Tidak ada media yang ditemukan.',
            }, { quoted: m });
        }

        for (const media of data.results) {
            if (media.type === 'image') {
                await conn.sendMessage(m.chat, {
                    image: { url: media.media },
                    caption: `📥 *Gambar*\n🎥 Quality: ${media.quality}\n📂 Format: ${media.format}`,
                }, { quoted: m });
            } else if (media.type === 'video') {
                await conn.sendMessage(m.chat, {
                    video: { url: media.media },
                    caption: `📥 *Video*\n🎥 Quality: ${media.quality}\n📂 Format: ${media.format}`,
                }, { quoted: m });
            }
        }
    } catch (error) {
        return conn.sendMessage(m.chat, {
            text: `${error.message}`,
        }, { quoted: m });
    }
};

// Menambahkan properti handler
handler.command = ['pindl'];
handler.tags = ['downloader'];
handler.help = ['pindl url'];

// Ekspor handler
module.exports = handler;
