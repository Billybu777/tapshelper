require('dotenv').config();
const { Client } = require('discord.js-selfbot-v13');

const client = new Client({ checkUpdate: false });

const allowedUserId = '538137180502097920';
const serverCommands = {
    '777271906486976512': {
        coadd: '.v cowner add',
        cormv: '.v cowner remove',
        colist: '.v cowner list'
    },
    '1233519767437049927': {
        coadd: '.v add_owner',
        cormv: '.v remove_owner',
        colist: '.v owner list'
    },
    '1171840053652238456': {
        coadd: '.v man add',
        cormv: '.v man remove',
        colist: '.v man list'
    }
};

client.on('ready', () => {
    console.log('Ready and working');
});

client.on('messageCreate', async (message) => {
    const content = message.content;
    if (message.author.id !== allowedUserId) return;

    let responseMessage;

    if (content.startsWith('xcoadd ')) {
        const userId = content.slice(7).trim();
        responseMessage = serverCommands[message.guild.id] ? `${serverCommands[message.guild.id].coadd} ${userId}` : '';
    } else if (content.startsWith('xcormv ')) {
        const userId = content.slice(7).trim();
        responseMessage = serverCommands[message.guild.id] ? `${serverCommands[message.guild.id].cormv} ${userId}` : '';
    } else if (content.startsWith('xcolist')) {
        responseMessage = serverCommands[message.guild.id] ? serverCommands[message.guild.id].colist : '';
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