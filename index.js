const Discord = require('discord.js');
const Enmap = require('enmap');
const fs = require('fs');

const { token } = require('./config.json');

const client = new Discord.Client();

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);

    console.log('log', `Reading ${files.length} events...`)

    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];

        console.log('log', `Attempting to load '${eventName}' event...`);

        client.on(eventName, event.bind(null, client));
    });
});

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);

    console.log('log', `Loading ${files.length} commands...`);

    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        console.log('log', `Attempting to load '${commandName}' command...`);
        client.commands.set(commandName, props);
    })
})

client.login(token);
