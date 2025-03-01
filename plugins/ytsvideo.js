const axios = require('axios');

class YouTubeDownloader {
    /**
     * Mengunduh video dari YouTube dalam format MP4 atau MP3.
     * @param {string} url - URL video YouTube yang valid.
     * @param {string} downtype - Tipe unduhan: 'mp4' atau 'mp3'.
     * @param {string} vquality - Kualitas video atau audio:
     *      - Untuk 'mp4': '144', '240', '360', '720', '1080'
     *      - Untuk 'mp3': '128', '360'
     * @returns {Promise<string>} - URL unduhan dari API.
     */
    static async downloadVideo(url, downtype, vquality) {
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:shorts\/|watch\?v=|music\?v=|embed\/|v\/|.+\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regex);

        if (!match) {
            throw new Error('URL tidak valid. Silakan masukkan URL YouTube yang benar.');
        }

        const videoId = match[1];
        const data = new URLSearchParams({ videoid: videoId, downtype, vquality });

        try {
            const response = await axios.post('https://api-cdn.saveservall.xyz/ajax-v2.php', data, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
            });
            return response.data.url;
        } catch (error) {
            throw new Error('Terjadi kesalahan: ' + error.message);
        }
    }

    /**
     * Mengambil link unduhan untuk kedua format MP4 dan MP3.
     * @param {string} url - URL video YouTube yang valid.
     * @param {Object} qualities - Kualitas unduhan untuk masing-masing format.
     * @param {string} qualities.mp4 - Kualitas untuk MP4.
     * @param {string} qualities.mp3 - Kualitas untuk MP3.
     * @returns {Promise<Object>} - Objek berisi URL unduhan MP4 dan MP3.
     */
    static async download(url, { mp4 = '360', mp3 = '128' } = {}) {
        try {
            const mp4Link = await YouTubeDownloader.downloadVideo(url, 'mp4', mp4);
            const mp3Link = await YouTubeDownloader.downloadVideo(url, 'mp3', mp3);
            return { mp4: mp4Link, mp3: mp3Link };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * Mencari video YouTube berdasarkan kata kunci.
     * @param {string} query - Kata kunci pencarian.
     * @returns {Promise<Object>} - Hasil pencarian dari API.
     */
    static async search(query) {
        const url = `https://api.flvto.top/@api/search/YouTube/${encodeURIComponent(query)}`;

        try {
            const response = await axios.get(url, {
                headers: {
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
                    'Cache-Control': 'no-cache',
                    'Origin': 'https://keepvid.online',
                    'Referer': 'https://keepvid.online/',
                    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
                }
            });
            
            return response.data.items.map(item => ({
                ...item,
                url: `https://www.youtube.com/watch?v=${item.id}`
            }));
        } catch (error) {
            throw new Error('Gagal mengambil hasil pencarian: ' + error.message);
        }
    }
}

const handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(`Gunakan format: ${usedPrefix}${command} Masukan judul video yg ingin di cari`)
    
    try {
        let video = (await YouTubeDownloader.search(text))[0]
        if (!video) return m.reply('Video tidak ditemukan!')
        
        let res = await YouTubeDownloader.download(video.url, { mp4: '360', mp3: '128' })
        await conn.sendFile(m.chat, res.mp4, 'video.mp4', 'Ini videonya', m)
    } catch (error) {
        m.reply('Terjadi kesalahan: ' + error.message)
    }
}

handler.help = ["ytsvideo"]
handler.tags = ["downloader"]
handler.limit = 5
handler.command = ["ytsvideo", "ytsv"]

module.exports = handler;