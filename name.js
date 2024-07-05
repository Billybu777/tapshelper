require('dotenv').config();
const { Client } = require('discord.js-selfbot-v13');

const client = new Client({
    checkUpdate: false,
});

const allowedUserId = '538137180502097920';

client.on('ready', () => {
    console.log('Ready and working');
});

client.on('messageCreate', async (message) => {
    const content = message.content;
    if (message.author.id !== allowedUserId) return;

    if (content.startsWith('xname')) {
        const args = content.slice(6).trim();
        const name = args;

        const nameMessage = `.v name ${name}`;
        const sentMessage = await message.channel.send(nameMessage);
        message.delete().catch(console.error);
        sentMessage.delete().catch(console.error);
    }
});

client.login(process.env.token).catch((error) => console.error(`Failed to login: ${error}`));