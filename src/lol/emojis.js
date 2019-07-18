const { championImageURI } = require('../../config.json');

module.exports.createEmojisFromChampions = async (message, champions) => {
    let emojis = [];
    for (champion of champions) {
        await message.guild.createEmoji(`${championImageURI}${champion.championName}.png`, champion.championName)
            .then(emoji => {
                console.log('log', `created new emoji with name ${emoji.name}`);
                emojis.push(emoji);
            })
            .catch(console.error);
    }

    return emojis;
}

module.exports.deleteEmojisFromChampions = (message, emojis) => {
    Object.keys(emojis).forEach((key, index) => {
        message.guild.deleteEmoji(emojis[key]);
    });
}