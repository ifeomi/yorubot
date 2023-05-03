# Yoruba Proverb Bot
A bot that posts a Yoruba proverb and its translation on Mastodon daily, deployed as an AWS lambda function.

## Usage
### Set up
1. Clone the repo using `git clone git@github.com:ifeomi/yorubot.git` for SSH, or `git clone https://github.com/ifeomi/yorubot.git` for HTTPS
2. Rename `.env-example` to `.env` and paste in your own secret keys

### Running the bot
```
npm install
node yoruba-bot.js
```

## Credit
Yoruba proverbs sourced from [@dapoadedire's Yoruba Proverbs repo](https://github.com/dapoadedire/yoruba-proverbs).