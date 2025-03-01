let badwordRegex = /anj|asw|kont|ToIol|gblk|T0lol|Bgsd|ajn|anjingk|bajingan|bangsat|kontol|memek|pepekq|meki|titit|peler|tetek|toket|ngewe|goblok|tolol|idiot|ngentotd|jembut|bego|dajjal|jancuk|pantek|pukimak|kimak|kampang|lonte|colimek|pelacur|henceut|nigga|fuck|dick|bitch|tits|bastard|asshole/i;

async function before(m, { conn, isBotAdmin }) {
    // Langsung return jika pesan berasal dari bot atau jika tidak mengandung kata toxic
    if (m.isBaileys && m.fromMe) return;
    if (!badwordRegex.test(m.text)) return;

    // Cek apakah fitur anti toxic aktif di chat dan bot adalah admin
    let chat = global.db.data.chats[m.chat];
    if (chat.antiToxic && m.isGroup && isBotAdmin) {
        try {
            // Hapus pesan dengan segera
            await conn.sendMessage(m.chat, { delete: { remoteJid: m.key.remoteJid, fromMe: false, id: m.key.id, participant: m.sender } });
        } catch (e) {
            console.log('Gagal menghapus pesan:', e);
        }
    }
    return true;
}

module.exports = { before };
