/*
 • Fitur By Anomaki Team
 • Created : Nazand Code
 • Buat Note | Hapus Note | Lihat Note | Berantakan? rapikan sendiri please :v
 • Jangan Hapus Wm
 • https://whatsapp.com/channel/0029Vaio4dYC1FuGr5kxfy2l
*/

const notes = {};
const handler = async (m, { conn, args, command }) => {
    const userId = m.sender;
    const showNotes = () => {
        const userNotes = notes[userId];
        if (userNotes && userNotes.length > 0) {
            return userNotes.map((note, index) => `${index + 1}. ${note}`).join("\n");
        }
        return "❗Tidak ada catatan ditemukan.";
    };
    switch (command) {
        case "addnote":
            if (!args.length) return m.reply("❗Tolong masukkan teks catatan.");
            const newNote = args.join(" ");
            if (!notes[userId]) notes[userId] = [];
            notes[userId].push(newNote);
            m.reply("✅ Catatan berhasil ditambahkan.");
            break;

        case "viewnotes":
            const notesList = showNotes();
            m.reply(notesList);
            break;

        case "deletenote":
            const noteIndex = parseInt(args[0]) - 1;
            if (isNaN(noteIndex) || noteIndex < 0 || noteIndex >= (notes[userId] || []).length) {
                return m.reply("❗Nomor catatan tidak valid.");
            }
            notes[userId].splice(noteIndex, 1);
            m.reply("✅ Catatan berhasil dihapus.");
            break;

        default:
            m.reply("❗Perintah tidak dikenali.");
            break;
    }
};

handler.help = ["addnote teks", "viewnotes", "deletenote nomor"];
handler.tags = ["tools"];
handler.command = ["addnote", "viewnotes", "deletenote"];
handler.limit = 4
handler.private = true

module.exports = handler;