// brat video plugin

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { execSync } = require('child_process');

let handler = async (m, { conn, text, usedPrefix, command }) => {
text = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.quoted && m.quoted.caption ? m.quoted.caption : m.quoted && m.quoted.description ? m.quoted.description : ''
  if (!text) return m.reply(`*• Example :* ${usedPrefix + command} *[text/reply pesan]*`);
  if (text.length > 250) return m.reply(`Karakter terbatas, max 250!`);

  const words = text.split(" ");
  const tempDir = path.join(process.cwd(), 'lib');
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
  const framePaths = [];

  try {
    for (let i = 0; i < words.length; i++) {
      const currentText = words.slice(0, i + 1).join(" ");
      const res = await axios.get( `https://brat.caliphdev.com/api/brat?text=${encodeURIComponent(currentText)}`,
        { responseType: "arraybuffer" }
      ).catch((e) => e.response);

      if (!res || res.status !== 200) {
        throw new Error("Gagal membuat stiker");
      }

      const framePath = path.join(tempDir, `frame${i}.mp4`);
      fs.writeFileSync(framePath, res.data);
      framePaths.push(framePath);
    }

    const fileListPath = path.join(tempDir, "filelist.txt");
    let fileListContent = "";

    for (let i = 0; i < framePaths.length; i++) {
      fileListContent += `file '${framePaths[i]}'\n`;
      fileListContent += `duration 0.7\n`;
    }

    fileListContent += `file '${framePaths[framePaths.length - 1]}'\n`;
    fileListContent += `duration 2\n`;

    fs.writeFileSync(fileListPath, fileListContent);
    const outputVideoPath = path.join(tempDir, "output.mp4");
    execSync(
      `ffmpeg -y -f concat -safe 0 -i ${fileListPath} -vf "fps=30" -c:v libx264 -preset ultrafast -pix_fmt yuv420p ${outputVideoPath}`
    );
    let stik = fs.readFileSync(outputVideoPath)
    await conn.sendImageAsSticker(m.chat, stik, m, {
      packname: "Bot",
      author: "WhatsApp",
    });
    
    framePaths.forEach((frame) => {
      if (fs.existsSync(frame)) fs.unlinkSync(frame);
    });
    if (fs.existsSync(fileListPath)) fs.unlinkSync(fileListPath);
    if (fs.existsSync(outputVideoPath)) fs.unlinkSync(outputVideoPath);
  } catch (e) {
    console.error(e);
    m.reply("Terjadi kesalahan");
  }
};
handler.help = ["bratvideo"].map((a) => a + " *text*");
handler.tags = ["sticker"];
handler.limit = 10
handler.command = ["bratvid","bratvideo"];

module.exports = handler;
