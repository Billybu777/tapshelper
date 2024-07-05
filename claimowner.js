require('dotenv').config();
const { Client } = require('discord.js-selfbot-v13');

const client = new Client({ checkUpdate: false });

const allowedUserId = '538137180502097920';
const specificServerIdClear = '1233519767437049927';
const specificServerIdStats = '777271906486976512';

client.on('ready', () => {
    console.log('Ready and working');
});

client.on('messageCreate', async (message) => {
    const content = message.content;
    if (message.author.id !== allowedUserId) return;

    let responseMessage;

    if (content.startsWith('xcl')) {
        responseMessage = '.v claim';
    } else if (content.startsWith('xow')) {
        responseMessage = '.v owner';
    } else if (content.startsWith('xsb')) {
        responseMessage = '.v sb';
    } else if (content.startsWith('xres')) {
        responseMessage = message.guild && message.guild.id === specificServerIdClear ? '.v clear' : '.v reset';
    } else if (content.startsWith('xst')) {
        responseMessage = message.guild && message.guild.id === specificServerIdStats ? '.v stats' : '.v info';
    }

    if (responseMessage) {
        try {
            const sentMessage = await message.channel.send(responseMessage);
            await message.delete();
            await sentMessage.delete();
        } catch (error) {
            console.error('Error deleting messages:', error);
        }
    }
});

client.login(process.env.token).catch((error) => console.error(`Failed to login: ${error}`));