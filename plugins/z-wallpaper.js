let handler = async (m, { conn }) => {
    try {
        
        let apiUrl = `https://api.betabotz.eu.org/api/wallpaper/wallhp?apikey=${lann}`;

        
        await conn.sendMessage(m.chat, {
            image: { url: apiUrl }, 
            caption: `Berikut adalah wallpaper random untuk Anda!`,
        }, { quoted: m });
    } catch (error) {
        console.error(error);
        throw `Terjadi kesalahan: ${error.message || error}`;
    }
};

handler.tags = ['image', 'internet'];
handler.help = ['wallpaper']; 
handler.limit = 5
handler.private = true
handler.command = /^(wallpaper)$/i; 

module.exports = handler;