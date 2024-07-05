require('dotenv').config();
const { Client } = require('discord.js-selfbot-v13');

const client = new Client({
    checkUpdate: false,
});

const allowedUserId = '538137180502097920';

client.once('ready', () => {
    console.log('Ready and working');
});

client.on('messageCreate', async (message) => {
    if (message.author.id !== allowedUserId) return;

    const content = message.content.toLowerCase();
    
    if (content.startsWith('xsed') || content.startsWith('x7el')) {
        const action = content.startsWith('xsed') ? '.v lock' : '.v unlock';
        const lockMessage = await message.channel.send(action);
        try {
            await Promise.all([message.delete(), lockMessage.delete()]);
        } catch (error) {
            console.error('Failed to delete message:', error);
        }
    }
});

client.login(process.env.token).catch((error) => console.error(`Failed to login: ${error}`));