require('dotenv').config();
const { Client } = require('discord.js-selfbot-v13');

const client = new Client({ checkUpdate: false });

const allowedUserId = '538137180502097920';
const serverCommands = {
    '777271906486976512': { // Server ID: 777271906486976512
        wl: '.v wl',
        wladd: '.v wl add',
        wlrnv: '.v wl remove',
        wlclear: '.v wl clear',
        bl: '.v bl'
    },
    '1171840053652238456': { // Server ID: 1171840053652238456
        wl: '.v wl list',
        bl: '.v bl list'
    },
    '1233519767437049927': { // Server ID: 1233519767437049927
        bl: '.v blacklist'
    }
};

client.on('ready', () => {
    console.log('Ready and working');
});

client.on('messageCreate', async (message) => {
    const content = message.content;
    if (message.author.id !== allowedUserId) return;

    let responseMessage;

    if (content.startsWith('xwl')) {
        const command = content.split(' ')[0];
        responseMessage = serverCommands[message.guild.id] ? serverCommands[message.guild.id][command.slice(2)] : '';
    } else if (content.startsWith('xbl')) {
        const command = content.split(' ')[0];
        responseMessage = serverCommands[message.guild.id] ? serverCommands[message.guild.id][command.slice(2)] : '';
    }

    if (responseMessage) {
        const sentMessage = await message.channel.send(responseMessage);
        setTimeout(() => {
            message.delete().catch(console.error);
            sentMessage.delete().catch(console.error);
        }, 1000);
    }
});

client.login(process.env.token).catch((error) => console.error(`Failed to login: ${error}`));
