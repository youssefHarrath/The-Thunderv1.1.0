const axios = require('axios');
const path = require('path');

module.exports.config = {
    name: "بوت",
    version: "1.0.0",
    hasPermission: 0,
    credits: "ZINO X MOHAMED",
    description: "ذكاء اصطناعي",
    usePrefix: false,
    commandCategory: "خدمات",
    cooldowns: 1,
};

module.exports.run = async function ({ api, event, args }) {
    try {
        const { messageID, threadID } = event;

        let prompt = args.join(' ');

        if (event.messageReply) {
            const repliedMessage = event.messageReply.body;
            prompt = `${repliedMessage} ${prompt}`.trim();
        }

        const stickerIDs = [
            '254596496003721',
            '254593389337365',
            '254597706003600',
            '371181363634400',
            '371180636967806',
            '2523891204552446',
            '2523889681219265',
            '2523887571219476',
            '2523890051219228'
        ];

        const randomStickerID = stickerIDs[Math.floor(Math.random() * stickerIDs.length)];

        if (!prompt) {
            return api.sendMessage({
                body: '',
                sticker: randomStickerID
            }, threadID, messageID);
        }

        const new_api_url = `https://playground.y2pheq.me/gpt4?prompt=${encodeURIComponent(prompt)}`;
        const response = await axios.get(new_api_url);

        if (response.data && response.data.result) {
            const generatedText = response.data.result;
            return api.sendMessage(`➪ 𝗚𝗣𝗧 🪽
━━━━━━━━━━━━━━━━━━━
${generatedText}
━━━━━━━━━━━━━━━━━━━
 ＺＩＮＯ Ｘ ＭＯＨＡＭＥＤ `, threadID, messageID);
        } else {
            console.error('Unexpected API response:', response.data);
            return api.sendMessage(`❌ Unexpected API response format. Please try again later.`, threadID, messageID);
        }
    } catch (error) {
        console.error('Error:', error);
        return api.sendMessage(`❌ An error occurred while generating the text response. Please try again later. Error details: ${error.message}`, threadID, messageID);
    }
};
