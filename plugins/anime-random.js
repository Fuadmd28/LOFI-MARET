const fetch = require('node-fetch');

let handler = async (m, { conn, text, usedPrefix, command }) => {
    const commands = [
        'akira', 'akiyama', 'anna', 'asuna', 'ayuzawa', 'boruto', 'chitanda',
        'chitoge', 'deidara', 'doraemon', 'elaina', 'emilia', 'asuna', 'erza',
        'gremory', 'hestia', 'hinata', 'inori', 'isuzu', 'itachi', 'itori', 'kaga',
        'kagura', 'kakasih', 'kaori', 'kosaki', 'kotori', 'kuriyama', 'kuroha',
        'kurumi', 'loli', 'madara', 'mikasa', 'miku', 'minato', 'naruto', 'natsukawa',
        'nezuko', 'nishimiya', 'onepiece', 'pokemon', 'rem', 'rize', 'sagiri',
        'sakura', 'sasuke', 'shina', 'shinka', 'shizuka', 'shota', 'tomori', 'toukachan',
        'tsunade', 'yatogami', 'yuki'
    ];

    if (commands.includes(command)) {
        let res = await (await fetch(`https://raw.githubusercontent.com/KazukoGans/database/main/anime/${command}.json`)).json();
        let cita = res[Math.floor(Math.random() * res.length)];
        await conn.sendFile(m.chat, cita, 'image.jpg', `${command}`, m);
    }
};

handler.command = handler.help = [
    'akira', 'akiyama', 'asuna', 'ayuzawa', 'boruto', 'chitanda',
    'chitoge', 'deidara', 'doraemon', 'elaina', 'emilia', 'asuna', 'erza',
    'gremory', 'hestia', 'hinata', 'inori', 'itachi', 'isuzu', 'itori', 'kaga',
    'kagura', 'kakasih', 'kaori', 'kaneki', 'kosaki', 'kotori', 'kuriyama',
    'kuroha', 'kurumi', 'madara', 'mikasa', 'miku', 'minato', 'naruto', 'natsukawa',
    'nezuko', 'nishimiya', 'onepiece', 'pokemon', 'rem', 'rize', 'sagiri',
    'sakura', 'sasuke', 'shina', 'shinka', 'shizuka', 'shota', 'tomori',
    'toukachan', 'tsunade', 'yatogami', 'yuki'
];
handler.tags = ['anime'];
handler.limit = 3;

module.exports = handler;