require('dotenv').config();
const { Client } = require('discord.js-selfbot-v13');

const client = new Client({ checkUpdate: false });

const allowedUserId = '538137180502097920';
const specificServerId = '1171840053652238456';

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
        case 'xrej':
            if (message.guild && message.guild.id === specificServerId) {
                for (let i = 1; i < args.length; i++) {
                    sendMessageWithDelay(`.v deny ${args[i]}`, 3200 * (i - 1));
                }
            } else {
                for (let i = 1; i < args.length; i++) {
                    sendMessageWithDelay(`.v reject ${args[i]}`, 3200 * (i - 1));
                }
            }
            break;
        case 'xrrej':
            for (let i = 1; i < args.length; i++) {
                sendMessageWithDelay(`.v rreject ${args[i]}`, 3100 * (i - 1));
            }
            break;
        default:
            break;
    }
});

client.login(process.env.token).catch((error) => console.error(`Failed to login: ${error}`));