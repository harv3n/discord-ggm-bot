const { RichEmbed } = require('discord.js');
const { Kayn, REGIONS } = require('kayn');
const { RGAPI, iconsURI, championImageURI } = require('../config.json');
const kayn = Kayn(RGAPI)({
    region: REGIONS.BRAZIL
});

const Summoner = require('../src/lol/summoner');

module.exports = {
    run: async (client, message, args) => {
        try {
            console.log('log', 'request received');
            const command = args.shift();
            if (command === "summoner") {
                const summonerName = args.join(' ');
                const summoner = await Summoner.getSummonerByName(kayn, summonerName)

                if (!summoner) return message.channel.send('Summoner not found!');
            
                for (champion of summoner.championsMastery) {
                    await message.guild.createEmoji(`${championImageURI}${champion.championName}.png`, champion.championName)
                        .then(emoji => console.log('log', `created new emoji with name ${emoji.name}`))
                        .catch(console.error);
                }

                const champ1 = await client.emojis.find(emoji => emoji.name === summoner.championsMastery[0].championName);
                const champ2 = await client.emojis.find(emoji => emoji.name === summoner.championsMastery[1].championName);
                const champ3 = await client.emojis.find(emoji => emoji.name === summoner.championsMastery[2].championName);

                const embedMessage = new RichEmbed()
                    .setColor('#0099ff')
                    .setTitle(`${summoner.name} / Lv: ${summoner.summonerLevel}`)
                    .setDescription(`${summoner.tier} ${summoner.rank} (${summoner.leaguePoints} pdl)`)
                    .setThumbnail(`${iconsURI}${summoner.profileIconId}.png`)
                    .addField(`Last 10 matches wins:`, `${summoner.wins}/10`, true)
                    .addField(`KDA:`, `${summoner.kda}`, true)
                    .addField('Most played champions:', `${champ1} ${champ2} ${champ3}`, true)
                    .addField('Best roles:', 'roles icon \n(roles winhate here)', true)
                message.channel.send(embedMessage);

                message.guild.deleteEmoji(champ1);
                message.guild.deleteEmoji(champ1);
                message.guild.deleteEmoji(champ1);
            }
        } catch (err) {
            console.error(err);
        }
    }
}

const freeWeekRotation = () => {
}

const getLeagueBySummonerID = () => {

}

const lolStatus = () => {

}

const getMatchBySummonerID = () => {

}

const getActiveGameBySummonerID = () => {

}

const getChampionMasteryByChampionID = () => {

}