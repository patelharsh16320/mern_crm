const puppeteer = require('puppeteer');
const youtubedl = require('youtube-dl-exec');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Function to clean filenames (remove invalid characters)
function sanitizeFilename(name) {
    return name.replace(/[\/:*?"<>|]/g, '').trim();
}

// Function to fetch all video links from a playlist
async function getPlaylistVideos(playlistUrl) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    console.log('📂 Fetching playlist details...');
    await page.goto(playlistUrl, { waitUntil: 'networkidle2' });

    console.log('📜 Scrolling to load all videos...');
    let lastHeight = await page.evaluate('document.documentElement.scrollHeight');
    while (true) {
        await page.evaluate('window.scrollTo(0, document.documentElement.scrollHeight)');
        await new Promise(resolve => setTimeout(resolve, 2000));
        let newHeight = await page.evaluate('document.documentElement.scrollHeight');
        if (newHeight === lastHeight) break;
        lastHeight = newHeight;
    }

    console.log('🔍 Extracting all video links...');
    const videos = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('#video-title'))
            .map(video => ({
                title: video.textContent.trim(),
                url: 'https://www.youtube.com' + video.getAttribute('href'),
            }))
            .filter(video => video.url.includes('watch'));
    });

    await browser.close();

    console.log(`🎥 Playlist contains ${videos.length} videos.`);
    return videos;
}

// Function to download & merge video+audio in 720p+
async function downloadAndMerge(video, index, totalVideos, downloadFolder) {
    const videoTitle = sanitizeFilename(video.title);
    const finalPath = path.join(downloadFolder, `${index + 1}. ${videoTitle}.mp4`);

    console.log(`\n📥 (${index + 1}/${totalVideos}) Downloading Video + Audio in 720p+...`);

    try {
        await youtubedl(video.url, {
            output: finalPath,
            format: 'bestvideo[height>=720]+bestaudio/best',
            mergeOutputFormat: 'mp4', // Ensures merged output
        });

        console.log(`✅ (${index + 1}/${totalVideos}) Downloaded & Merged: ${videoTitle}.mp4`);

    } catch (error) {
        console.error(`❌ Error downloading: ${video.title}`, error);
    }
}

// Function to process the playlist API request
async function processPlaylist(req, res) {
    const { playlistUrl } = req.body;
    if (!playlistUrl) return res.status(400).json({ error: 'Playlist URL is required' });

    console.log(`\n🔗 Received Playlist: ${playlistUrl}`);

    try {
        const videos = await getPlaylistVideos(playlistUrl);
        if (!videos.length) return res.status(404).json({ error: 'No videos found in the playlist' });

        const downloadFolder = path.join(__dirname, '../downloads');
        if (!fs.existsSync(downloadFolder)) {
            fs.mkdirSync(downloadFolder, { recursive: true });
        }

        console.log(`🚀 Starting downloads... Total Videos: ${videos.length}\n`);

        for (let i = 0; i < videos.length; i++) {
            await downloadAndMerge(videos[i], i, videos.length, downloadFolder);
        }

        console.log('\n🎉 All videos downloaded & merged successfully!');
        res.json({ message: 'Download completed successfully!', totalVideos: videos.length });
    } catch (error) {
        console.error('❌ Error processing request:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { processPlaylist };