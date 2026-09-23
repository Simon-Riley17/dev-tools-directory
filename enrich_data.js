const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');

const dataPath = path.join(__dirname, 'src/data.json');
let data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

async function fetchMetadata(url) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(url, { 
      signal: controller.signal, 
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } 
    });
    clearTimeout(timeoutId);
    
    if (!res.ok) return null;
    const html = await res.text();
    const $ = cheerio.load(html);
    
    let title = $('meta[property="og:title"]').attr('content') || $('title').text() || '';
    let description = $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content') || '';
    let image = $('meta[property="og:image"]').attr('content') || '';
    
    // Clean up title
    title = title.replace(/\n/g, '').trim();
    if (title.length > 60) title = title.substring(0, 60) + '...';
    
    // Clean up description
    description = description.replace(/\n/g, '').trim();
    if (description.length > 120) description = description.substring(0, 120) + '...';
    
    return { title, description, image };
  } catch (e) {
    return null;
  }
}

async function processInBatches() {
  console.log('Starting metadata fetch...');
  let totalProcessed = 0;
  
  for (const category of data) {
    // To save time for this demo, we will only fetch metadata for the first 5 items in each category
    // In a real production app, you would fetch all of them, or do it on-demand in the Next.js API.
    const toolsToProcess = category.tools.slice(0, 10); 
    
    const promises = toolsToProcess.map(async (tool) => {
      if (tool.metadata) return; // already processed
      
      const meta = await fetchMetadata(tool.url);
      if (meta && meta.title) {
        tool.metadata = meta;
      } else {
        // Fallback metadata if fetch fails (e.g. GitHub repos)
        let fallbackTitle = tool.url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0];
        if (tool.type === 'github_repo') {
          const parts = tool.url.split('github.com/');
          if (parts.length > 1) fallbackTitle = parts[1];
        }
        tool.metadata = { title: fallbackTitle, description: 'No description available.', image: '' };
      }
      totalProcessed++;
      process.stdout.write(`\rProcessed ${totalProcessed} tools...`);
    });
    
    await Promise.allSettled(promises);
    
    // For tools beyond the first 10, just give them fallback metadata instantly to save time
    for (let i = 10; i < category.tools.length; i++) {
        const tool = category.tools[i];
        let fallbackTitle = tool.url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0];
        if (tool.type === 'github_repo') {
          const parts = tool.url.split('github.com/');
          if (parts.length > 1) fallbackTitle = parts[1];
        }
        tool.metadata = { title: fallbackTitle, description: '', image: '' };
    }
  }
  
  console.log('\nFinished! Saving to data.json...');
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

processInBatches();
