const { promisify } = require('util');
const sleep = promisify(setTimeout);

const handler = async (m, { conn, command, text, usedPrefix }) => {
    if (!text) throw `Use example ${usedPrefix}${command} @tag org nya`;

    // Delay 3 detik
    await sleep(3000);

    conn.reply(m.chat, `
${command} *${text}*
*${text}* is *${(Math.floor(Math.random() * 101))}%* ${command.replace('how', '').toUpperCase()}
`.trim(), m, m.mentionedJid ? { mentions: m.mentionedJid } : {});
};

handler.help = ['gay', 'pintar', 'cantik', 'ganteng', 'gabut', 'gila', 'lesbi', 'stress', 'bucin', 'jones', 'sadboy'].map(v => 'how' + v);
handler.tags = ['kerang', 'fun'];
handler.command = /^how(gay|pintar|cantik|ganteng|gabut|gila|lesbi|stress?|bucin|jones|sadboy)/i;
handler.limit = 4;

module.exports = handler;