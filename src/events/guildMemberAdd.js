const { defaultChannel } = require('../../config/config.json');

module.exports = (client, member) => {
    console.log(`${member.displayName} - ${member.id}`);
    client.channels.get(defaultChannel).send(`${member.displayName} - ${member.id}`);
}