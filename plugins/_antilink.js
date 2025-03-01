const linkRegex = /chat.whatsapp.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i;
const WaLinkRegex = /wa.me\/([0-9])/i;

module.exports.before = async function (m, { isAdmin, isBotAdmin }) {
    if (m.isBaileys && m.fromMe) return;
    const chat = global.db.data.chats[m.chat];
    const isGroupLink = linkRegex.exec(m.text);
    const isLinkWa = WaLinkRegex.exec(m.text);

    if (chat.antiLink && m.isGroup) {
        if (isGroupLink && !isAdmin) {
            if (isBotAdmin) {
                const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`;
                if (m.text.includes(linkThisGroup)) return true;
            }
            if (chat.teks) {
                m.reply(`_*‼️ Link Group Terdeteksi!*_ Pesan kamu akan dihapus! ❌ ${isBotAdmin ? '' : '\n\n_❬Bot Bukan Admin❭_'}`);
            }
            if (isBotAdmin) {
                await conn.sendMessage(m.chat, { delete: m.key });
            }
        }
    } else if (chat.antiLinkWa && m.isGroup) {
        if (isLinkWa && !isAdmin) {
            if (chat.teks) {
                m.reply(`_*‼️ Link Whatsapp Terdeteksi!*_ Pesan kamu akan dihapus! ❌ ${isBotAdmin ? '' : '\n\n_❬Bot Bukan Admin❭_'}`);
            }
            if (isBotAdmin) {
                await conn.sendMessage(m.chat, { delete: m.key });
            }
        }
    }
    return;
};