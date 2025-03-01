/*
PLUGINS GEMINI AI SUPPORT IMAGE FIX + BONUS APIKEY
Code is arranged by Rapikz
https://rapikzhehe.vercel.app
Note:
- Don't delete this WM
- This WM is not disturbing!!!!
*/

const { GoogleGenerativeAI } = require("@google/generative-ai");
const uploadFile = require('../lib/uploadFile.js');
const uploadImage = require('../lib/uploadImage.js');

const handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw (`Contoh:\n${usedPrefix}${command} Halo?`);

    const apikeynyah = "AIzaSyB3Q74etnADQ_qSX3OJtzTnteGh-fd4df8";
    const genAI = new GoogleGenerativeAI(apikeynyah);
    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro" });
    const prompt = `${text}`;
    const result = await model.generateContent(prompt);

    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';
    if (!mime) throw `[ GEMINI - AI ]\n\n${result.response.text()}`;

    let media = await q.download();
    let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime);
    let link = await (isTele ? uploadImage : uploadFile)(media);

    const imageResp = await fetch(`${link}`)
        .then((response) => response.arrayBuffer());

    const result2 = await model.generateContent([
        {
            inlineData: {
                data: Buffer.from(imageResp).toString("base64"),
                mimeType: "image/jpeg",
            },
        },
        `${text}`,
    ]);

    let yayaya = `[ GEMINI - AI ]\n\n${result2.response.text()}`;
    m.reply(yayaya);
};

handler.help = ['gemini'];
handler.tags = ['ai'];
handler.command = /^(gemini)$/i;
handler.limit = 6;

module.exports = handler;
