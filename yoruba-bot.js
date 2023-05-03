import dotenv from 'dotenv'
import Mastodon from 'mastodon-api';
import bent from 'bent'

dotenv.config();

console.log("Yoruba proverbs bot starting...");


// create Mastodon instance to interact with API.
const M = new Mastodon({
    client_key: process.env.CLIENT_KEY,
    client_secret: process.env.CLIENT_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    timeout_ms: 60*1000,  // optional HTTP request timeout to apply to all requests.
    api_url: 'https://mastodon.world/api/v1/',
});


/**
 * getRandomProverb fetches JSON-encoded proverbs and select a random one
 * @returns {Object} Proverb object
 */
async function getRandomProverb() {
    const url = 'https://raw.githubusercontent.com/dapoadedire/yoruba-proverbs/master/proverbs.json';
    const getJSON = bent('json');
    const res = await getJSON(url);
    const proverbs = res.proverbs;
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
    const proverb = await getRandomProverb();
    const res = await tootProverb(proverb.proverb, proverb.translation);
    return res;
}