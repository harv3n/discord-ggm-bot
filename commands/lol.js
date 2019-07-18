const { RichEmbed } = require('discord.js');
const { Kayn, REGIONS } = require('kayn');
const { RGAPI, iconsURI } = require('../config.json');

const lolEmojis = require('../src/lol/emojis');

const kayn = Kayn(RGAPI)({
    region: REGIONS.BRAZIL
});

const Summoner = require('../src/lol/summoner');

module.exports = {
    run: async (client, message, args) => {
        try {
            const command = args.shift();
            if (command === "summoner") {
                const summonerName = args.join(' ');
                const summoner = await Summoner.getSummonerByName(kayn, summonerName)

                if (!summoner) return message.channel.send('Summoner not found!');

                const emojis = await lolEmojis.createEmojisFromChampions(message, summoner.championsMastery);

                const embedMessage = new RichEmbed()
                    .setColor('#0099ff')
                    .setTitle(`${summoner.name} / Lv: ${summoner.summonerLevel}`)
                    .setDescription(`${summoner.tier} ${summoner.rank} (${summoner.leaguePoints} pdl)`)
                    .setThumbnail(`${iconsURI}${summoner.profileIconId}.png`)
                    .addField(`Last 10 matches wins:`, `${summoner.wins}/10`, true)
                    .addField(`KDA:`, `${summoner.kda}`, true)
                    .addField('Most played champions:', `${emojis[0]} ${emojis[1]} ${emojis[2]}`, true)
                    .addField('Best roles:', 'roles icon \n(roles winhate here)', true)
                await message.channel.send(embedMessage);

                lolEmojis.deleteEmojisFromChampions(message, emojis);
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