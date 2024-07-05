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
    if (message.author.id !== allowedUserId) return;

    const content = message.content.toLowerCase();

    if (content === 'xhide') {
        await executeCommand(message, '.v hide');
    } else if (content === 'xshow') {
        await executeCommand(message, '.v show');
    }
});

async function executeCommand(message, response) {
    try {
        const sentMessage = await message.channel.send(response);
        await Promise.all([message.delete(), sentMessage.delete()]);
    } catch (error) {
        console.error('Failed to execute command:', error);
    }
}

client.login(process.env.token).catch((error) => console.error(`Failed to login: ${error}`));