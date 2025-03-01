const axios = require("axios");
const cheerio = require("cheerio");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const handler = async (m, { text, command, conn }) => {
    if (!text) {
        return m.reply("Masukkan kata kunci, atau URL untuk download.");
    }

    if (command === "stclouds") {
        const searchUrl = `https://stickers.cloud/id/cari?q=${encodeURIComponent(text)}`;

        try {
            const response = await axios.get(searchUrl, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:117.0) Gecko/20100101 Firefox/117.0",
                    "Accept-Language": "en-US,en;q=0.9",
                    "Cookie": "i18n_redirected=id; auth.strategy=local; _ga=GA1.1.1958638283.1735805628; __gads=ID=e238e61b547158d7:T=1735805629:RT=1735805629:S=ALNI_MZfefKFxE0GYa4YsJ_K8ikBxt7IKg; __gpi=UID=00000fd0e6245d55:T=1735805629:RT=1735805629:S=ALNI_MYi3ZLsPy6hYkj5em4qboRO6D0new; __eoi=ID=9860f4c338c3007d:T=1735805629:RT=1735805629:S=AA-AfjYyxLITedAy9QKnrEo_vO19; _ga_KPP7P2WM71=GS1.1.1735805627.1.1.1735805670.0.0.0"
                }
            });
            const $ = cheerio.load(response.data);
            const results = [];
            $("div.white.rounded.list-item.mt-4.default-shadow a").each((_, el) => {
                const link = $(el).attr("href");
                if (link && link.startsWith("/id/paket/")) {
                    results.push(`https://stickers.cloud${link}`);
                }
            });
            if (results.length === 0) {
                return m.reply("Tidak ada hasil yang ditemukan untuk pencarian tersebut.");
            }
            const resultMessage = results.map((url, i) => `${i + 1}. ${url}`).join("\n");
            m.reply(`Hasil pencarian:\n\n- ${resultMessage}`);
        } catch (error) {
            console.error("Error mencari sticker:", error.message);
            m.reply("Terjadi error, cek koneksi internet Anda.");
        }
    } else if (command === "stclouddl") {
        const targetUrl = text;
        try {
            const response = await axios.get(targetUrl, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:117.0) Gecko/20100101 Firefox/117.0",
                    "Accept-Language": "en-US,en;q=0.9",
                    "Cookie": "i18n_redirected=id; auth.strategy=local; _ga=GA1.1.1958638283.1735805628; __gads=ID=e238e61b547158d7:T=1735805629:RT=1735805629:S=ALNI_MZfefKFxE0GYa4YsJ_K8ikBxt7IKg; __gpi=UID=00000fd0e6245d55:T=1735805629:RT=1735805629:S=ALNI_MYi3ZLsPy6hYkj5em4qboRO6D0new; __eoi=ID=9860f4c338c3007d:T=1735805629:RT=1735805629:S=AA-AfjYyxLITedAy9QKnrEo_vO19; _ga_KPP7P2WM71=GS1.1.1735805627.1.1.1735805670.0.0.0"
                }
            });
            const $ = cheerio.load(response.data);
            const images = [];
            $("div.whatsapp-background div.row div img").each((_, el) => {
                const imgUrl = $(el).attr("src");
                if (imgUrl) images.push(imgUrl);
            });
            if (images.length === 0) {
                return m.reply("Tidak ada sticker yang ditemukan di halaman ini.");
            }
            m.reply(`Ditemukan ${images.length} sticker. 🔥`);

            for (let i = 0; i < images.length; i++) {
                const imgUrl = images[i];

                const imgResponse = await axios.get(imgUrl, {
                    responseType: "arraybuffer"
                });

                await conn.sendMessage(
                    m.chat,
                    { sticker: imgResponse.data },
                    { quoted: m }
                );

                // Delay 4 detik sebelum mengirim stiker berikutnya
                await delay(4000);
            }
            m.reply("Selesai mengirim sticker!");
        } catch (error) {
            console.error("Error:", error.message);
            m.reply("Gagal.");
        }
    }
};

handler.help = ["stclouds nama", "stclouddl"];
handler.tags = ["tools","sticker"];
handler.limit = 5
handler.command = /^(stclouds|stclouddl)$/i;

module.exports = handler;
