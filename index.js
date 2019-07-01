const { Client, RichEmbed } = require('discord.js');

const { prefix, token } = require('./config/config.json');

const client = new Client();

const commandGroups = [
    ['help', 'help commands'],
    ['mod', 'moderation commands'],
    ['group', 'group commands']
]

client.on('ready', () => {
        console.log(`Client ready; Logged as ${client.user.username}#${client.user.discriminator} (${client.user.id})`);
    });

client.on('message', msg => {
        if (!msg.content.startsWith(prefix)) return;

        if (msg.author.id === client.user.id) return;

        const args = msg.content
            .slice(prefix.length + 1)
            .split(/ +/);
        const commandGroup = args.shift();

        msg.reply(`Command group: ${commandGroup}`)
        msg.reply(`Arguments: ${args}`);

        commandGroups.map((elements) => {
            if (elements.includes(commandGroup))
                msg.reply(`command from group ${commandGroup}`);
        });
    });

client.login(token);
