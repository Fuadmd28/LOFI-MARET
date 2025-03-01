const fetch = require('node-fetch'); // Pastikan module ini sudah diinstall

let handler = async (m, { text, usedPrefix, command, conn }) => {
    try {
        if (!text) {
            return m.reply(`Contoh:\n${usedPrefix}${command} Halo?`);
        }

        console.log("Memulai pemanggilan API...");

        let gpiti = await gptturbo(text);
        console.log("Respons dari API GPT-Turbo:", gpiti);

        let turbo = `⬣─── 「 *G P T T U R B O* 」\n\nTitle : ${text}\n\nMessage : ${gpiti}`;

        // Kirim gambar dengan URL dan pesan ke pengguna
        const { key } = await conn.sendMessage(m.chat, {
            image: {
                url: 'https://pomf2.lain.la/f/qumom7ik.jpg' // Ganti URL gambar sesuai keinginan
            },
            caption: turbo,  // Gambar dengan caption (text)
            contextInfo: {
                externalAdReply: {
                    title: "GPT - TURBO",
                    body: '',
                    thumbnailUrl: "https://pomf2.lain.la/f/jzv6iqu.jpg",
                    sourceUrl: null,
                    mediaType: 1,
                    renderLargerThumbnail: true,
                },
            },
        });

        console.log("Pesan berhasil terkirim dengan gambar.");

    } catch (error) {
        console.error("Terjadi kesalahan:", error.message);
        await m.reply("Terjadi kesalahan. Coba lagi nanti.");
    }
};

// Fungsi untuk memanggil API GPT Turbo
async function gptturbo(query) {
    const apiUrl = `https://restapii.rioooxdzz.web.id/api/gptturbo?message=${encodeURIComponent(query)}`;
    console.log("URL API yang dipanggil:", apiUrl);

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                "User-Agent": "Mozilla/5.0",
            },
        });

        console.log("Status API:", response.status);

        if (!response.ok) {
            throw new Error(`Error dari API: ${response.status}`);
        }

        const responseJson = await response.json();
        console.log("Respons API:", responseJson);

        if (responseJson && responseJson.data && responseJson.data.response) {
            return responseJson.data.response;
        } else {
            return "Tidak ada pesan dalam respons.";
        }
    } catch (error) {
        console.error("Terjadi kesalahan saat memanggil API:", error.message);
        return "Gagal mendapatkan respons dari server.";
    }
}

handler.help = ['gptturbo'];
handler.tags = ['ai'];
handler.limit = 4
handler.command = /^(gptturbo)$/i;

module.exports = handler;