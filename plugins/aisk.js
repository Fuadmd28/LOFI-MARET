const { run } = require('shannz-playwright');

async function iask(query) {
  const code = `const { chromium } = require('playwright');

  async function iask(query) {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    try {
      await page.goto(\`https://iask.ai/?mode=question&q=\${query}\`);
      await page.waitForSelector('.mt-6.md\\\\:mt-4.w-full.p-px.relative.self-center.flex.flex-col.items-center.results-followup', { timeout: 0 });
      
      const outputDiv = await page.$('#output');

      if (!outputDiv) {
        return { image: [], answer: null, sources: [], videoSource: [], webSearch: [] };
      }

      const answerElement = await outputDiv.$('#text');
      const answerText = await answerElement.evaluate(el => el.innerText);
      const [answer, sourcesText] = answerText.split('Top 3 Authoritative Sources Used in Answering this Question');
      const cleanedAnswer = answer.replace(/According to Ask AI & Question AI www\\.iAsk\\.ai:\\s*/, '').trim();
      const sources = sourcesText ? sourcesText.split('\\n').filter(source => source.trim() !== '') : [];
      
      const imageElements = await outputDiv.$$('img');
      const images = await Promise.all(imageElements.map(async (img) => {
        return await img.evaluate(img => img.src);
      }));

      const videoSourceDiv = await page.$('#related-videos');
      const videoSources = [];
      if (videoSourceDiv) {
        const videoElements = await videoSourceDiv.$$('a');
        for (const videoElement of videoElements) {
          const videoLink = await videoElement.evaluate(el => el.href);
          const videoTitle = await videoElement.$eval('h3', el => el.innerText).catch(() => 'No title found');
          const videoThumbnail = await videoElement.$eval('img', el => el.src).catch(() => 'No thumbnail found');

          if (videoTitle !== 'No title found' && videoThumbnail !== 'No thumbnail found') {
            videoSources.push({ title: videoTitle, link: videoLink, thumbnail: videoThumbnail });
          }
        }
      }

      const webSearchDiv = await page.$('#related-links');
      const webSearchResults = [];
      if (webSearchDiv) {
        const linkElements = await webSearchDiv.$$('a');
        for (const linkElement of linkElements) {
          const linkUrl = await linkElement.evaluate(el => el.href);
          const linkTitle = await linkElement.evaluate(el => el.innerText);
          const linkImage = await linkElement.$eval('img', el => el.src).catch(() => 'No image found');
          const linkDescription = await linkElement.evaluate(el => el.nextElementSibling.innerText).catch(() => 'No description found');

          if (linkTitle && linkUrl) {
            webSearchResults.push({
              title: linkTitle,
              link: linkUrl,
              image: linkImage,
              description: linkDescription
            });
          }
        }
      }
      
      const src = sources.map(source => source.trim());
      const result = { image: images, answer: cleanedAnswer, sources: src, videoSource: videoSources, webSearch: webSearchResults };
      return JSON.stringify(result, null, 2);

    } catch (error) {
      console.error('Error fetching data:', error);
      return { image: [], answer: null, sources: [], videoSource: [], webSearch: [] };
    } finally {
      await browser.close();
    }
  }

  iask(\`${query}\`).then(a => console.log(a));`;

  const start = await run('javascript', code);
  const string = start.result.output;
  return JSON.parse(string);
}

async function handler(m, { conn, args }) {
  if (!args[0]) {
    return m.reply('*Contoh* .aisk kenapa kucing oren di sebut kucing bar bar');
  }

  const query = args.join(' ');

  await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key } });

  try {
    const result = await iask(query);
    const answer = result.answer || 'Jawaban tidak ditemukan.';
    const sources = result.sources.length > 0 ? result.sources.join('\n') : 'Sumber tidak ditemukan.';
    const thumbnail = result.image.length > 0 ? result.image[0] : null;
    
    if (thumbnail) {
      await conn.sendFile(
        m.chat,
        thumbnail,
        'thumbnail.jpg',
        `*Jawaban:*\n${answer}\n\n*Sumber:*\n${sources}`,
        m
      );
    } else {
      await m.reply(`*Jawaban:*\n${answer}\n\n*Sumber:*\n${sources}`);
    }
  } catch (error) {
    console.error(error);
    await m.reply('Terjadi kesalahan saat memproses permintaan.');
  } finally {
    await conn.sendMessage(m.chat, { react: { text: '', key: m.key } });
  }
}

handler.help = ['iask'];
handler.tags = ['ai'];
handler.limit = 4 
handler.command = /^(aisk)$/i

module.exports = handler;