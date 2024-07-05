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
    if (message.author.id !== allowedUserId || !message.content.toLowerCase().startsWith('xlim')) return;

    const args = message.content.trim().split(/\s+/);
    const limit = parseInt(args[1]);

    if (isNaN(limit)) {
        console.error(`Invalid argument: ${args[1]}`);
        return;
    }

    try {
        const limitMessage = `.v limit ${limit}`;
        const sentMessage = await message.channel.send(limitMessage);
        await Promise.all([message.delete(), sentMessage.delete()]);
    } catch (error) {
        console.error('Failed to execute command:', error);
    }
});

client.login(process.env.token).catch((error) => console.error(`Failed to login: ${error}`));