const axios = require('axios');

let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {

    if (!text) {
        return m.reply('> ✨Hallo ada yang bisa saya bantu?');
    }

    try {
        console.log('Sending initial image...');
        const { key } = await conn.sendMessage(m.chat, {
            image: {
                url: 'https://telegra.ph/file/f4863e1811d18f6f7c011.jpg'
            },
            caption: 'Processing your request, please wait...'
        }, {
            quoted: m,
            mentions: [m.sender]
        });

        console.log('Fetching GPT-4 response...');
        const result = await gpt4(text);
        
        if (!result || !result.reply) {
            console.error('Error: No valid response from GPT-4 API');
            return m.reply('Sorry, I could not process your request. Please try again later.');
        }

        await conn.delay(500);
        console.log('Sending final response with GPT-4 result...');
        await conn.sendMessage(m.chat, {
            image: {
                url: 'https://telegra.ph/file/f4863e1811d18f6f7c011.jpg'
            },
            caption: '\n> ✨' + result.reply,
            edit: key
        }, {
            quoted: m,
            mentions: [m.sender]
        });

    } catch (e) {
        console.error('Error occurred:', e);
        await m.reply('An error occurred while processing your request.');
    }
};

handler.help = ["gpt4"];
handler.tags = ["ai"];
handler.limit = true
handler.command = /^(gpt4)$/i;

module.exports = handler;

async function gpt4(txt) {
    try {
        console.log('Sending request to GPT-4 API...');
        const api = await axios.get(`https://hercai.onrender.com/turbo/hercai?question=${encodeURIComponent(txt)}`, {
            headers: {
                "content-type": "application/json",
            },
        });

        if (api && api.data) {
            console.log('Received valid response from GPT-4 API');
            return api.data;
        } else {
            console.error('Error: Invalid response from GPT-4 API');
            return null;
        }
    } catch (e) {
        console.error('Error while fetching GPT-4 API response:', e);
        return null;
    }
}