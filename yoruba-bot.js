import dotenv from 'dotenv';
import Mastodon from 'mastodon-api';
import fs from 'fs';

dotenv.config();

console.log("Yoruba proverbs bot starting...");


// create Mastodon instance to interact with API.
const M = new Mastodon({
    client_key: process.env.CLIENT_KEY,
    client_secret: process.env.CLIENT_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    timeout_ms: 60*1000,  // optional HTTP request timeout to apply to all requests.
    api_url: 'https://botsin.space/api/v1/',
});


/**
 * getRandomProverb fetches JSON-encoded proverbs and select a random one
 * @returns {Object} Proverb object
 */
function getRandomProverb() {
    const path = 'proverbs.json';
    const rawData = fs.readFileSync(path);
    const proverbs = JSON.parse(rawData).proverbs;
    const num = Math.floor(Math.random() * proverbs.length);

    return proverbs[num];
}


/**
 * tootProverb posts proverb and translation to Mastodon with translation behind spoiler text
 * @param {string} proverb 
 * @param {string} translation 
 */
async function tootProverb(proverb, translation) {
    const tag = "#YorubaProverbs #Yoruba";
    const params = {
        spoiler_text: proverb,
        sensitive: false,
        status: `${translation} ${tag}`
    };

    const res = await M.post('statuses', params);
    const data = res.data
    console.log(`ID: ${data.id} and timestamp: ${data.created_at}`);
    console.log(data.spoiler_text);
    console.log(data.content);
    return 200;
}

export const handler = async () => {
    const proverb = getRandomProverb();
    const res = await tootProverb(proverb.proverb, proverb.translation);
    return res;
}