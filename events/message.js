const { prefix } = require('../config.json');

module.exports = (client, message) => {
    if (message.author.bot) return;

    console.log('log', `message received from ${message.author}`);

    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command);

    if (!cmd) return;

    cmd.run(client, message, args);
}