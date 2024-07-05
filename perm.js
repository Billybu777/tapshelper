require('dotenv').config();
const { Client } = require('discord.js-selfbot-v13');

const client = new Client({ checkUpdate: false });

const allowedUserId = '538137180502097920';
const specificServerId = '777271906486976512';

client.on('ready', () => {
    console.log('Ready and working');
});

client.on('messageCreate', async (message) => {
    if (message.author.id !== allowedUserId) return;

    const content = message.content.trim();
    const args = content.split(/\s+/);

    const sendMessageWithDelay = async (responseMessage, delay) => {
        setTimeout(async () => {
            try {
                const sentMessage = await message.channel.send(responseMessage);
                setTimeout(async () => {
                    try {
                        await message.delete();
                    } catch (error) {
                        console.error(`Failed to delete original message: ${error}`);
                    }
                    try {
                        await sentMessage.delete();
                    } catch (error) {
                        console.error(`Failed to delete sent message: ${error}`);
                    }
                }, 1000);
            } catch (error) {
                console.error(`Failed to send message: ${error}`);
            }
        }, delay);
    };

    switch (args[0]) {
        case 'xperms':
            sendMessageWithDelay(message.guild && message.guild.id === specificServerId ? '.v perms' : '.v permits', 0);
            break;
        case 'xperm':
            for (let i = 1; i < args.length; i++) {
                sendMessageWithDelay(`.v permit ${args[i]}`, 3100 * (i - 1));
            }
            break;
        case 'xpermall':
            sendMessageWithDelay('.v permall', 0);
            break;
        case 'xrperm':
            for (let i = 1; i < args.length; i++) {
                sendMessageWithDelay(`.v rpermit ${args[i]}`, 3100 * (i - 1));
            }
            break;
        default:
            break;
    }
});

client.login(process.env.token).catch((error) => console.error(`Failed to login: ${error}`));