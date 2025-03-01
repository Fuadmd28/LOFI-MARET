const axios = require('axios');
const cheerio = require('cheerio');

let handler = async (m, { conn, text }) => {
    if (!text) return m.reply('Masukkan username TikTok yang ingin Anda stalk.\n*Contoh:*\n > .tiktokstalk bang_fd2006');

    try {
        const result = await tiktokStalk(text);
        const { userInfo } = result;

        let message = `\`[ User Metadata ]\`\n\n`;
        message += Object.entries(userInfo)
            .map(([key, value]) => `> *- ${key.charAt(0).toUpperCase() + key.slice(1)}:* ${value}`)
            .join("\n");

        await m.reply(message);
    } catch (error) {
        await conn.sendMessage(`Gagal mengambil data: ${error.message}`);
    }
};

handler.command = /^(ttstalk|tiktokstalk)$/i;
handler.help = ["ttstalk","tiktokstalk"]
handler.tags = ["search","downloader"];

module.exports = handler;

//fungsi ini!!!! 
async function tiktokStalk(username) {
    try {
        const response = await axios.get(`https://www.tiktok.com/@${username}?_t=ZS-8tHANz7ieoS&_r=1`);
        const html = response.data;
        const $ = cheerio.load(html);
        const scriptData = $('#__UNIVERSAL_DATA_FOR_REHYDRATION__').html();
        const parsedData = JSON.parse(scriptData);

        const userDetail = parsedData.__DEFAULT_SCOPE__?.['webapp.user-detail'];
        if (!userDetail) {
            throw new Error('User tidak ditemukan');
        }

        const userInfo = userDetail.userInfo?.user;
        const stats = userDetail.userInfo?.stats;

        const metadata = {
            userInfo: {
                Id: userInfo?.id || null,
                Username: userInfo?.uniqueId || null,
                Nama: userInfo?.nickname || null,
                Avatar: userInfo?.avatarLarger || null,
                Bio: userInfo?.signature || null,
                Verifikasi: userInfo?.verified || false,
                Totalfollowers: stats?.followerCount || 0,
                Totalmengikuti: stats?.followingCount || 0,
                Totaldisukai: stats?.heart || 0,
                Totalvideo: stats?.videoCount || 0,
                Totalteman: stats?.friendCount || 0,
            }
        };

        return metadata;
    } catch (error) {
        throw new Error(error.message);
    }
}
