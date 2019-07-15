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
                const summonerName = args.toString().replace(',', ' ');
                const summoner = await Summoner.getSummonerByName(kayn, summonerName);
                console.log(client.guild);
                // client.guild.createEmoji(`${championImageURI}${summoner.championsMastery.championName}`, summoner.championsMastery.championName)
                //     .then(emoji => console.log('log', `created new emoji with name ${emoji.name}`))
                //     .catch(console.error);
                // const champion1 = client.emojis.find(emoji => emoji.name === summoner.championsMastery.championName);
                const embedMessage = new RichEmbed()
                    .setColor('#0099ff')
                    .setTitle(`${summoner.name} / Lv: ${summoner.summonerLevel}`)
                    .setDescription(`${summoner.tier} ${summoner.rank} (${summoner.leaguePoints} pdl)`)
                    .setThumbnail(`${iconsURI}${summoner.profileIconId}.png`)
                    .addField(`Last 10 matches wins:`, `${summoner.wins}/10`, true)
                    .addField(`KDA:`, `${summoner.kda}`, true)
                    .addField('Most played champions:', `123`, true)
                    .addField('Best roles:', 'roles icon \n(roles winhate here)', true)
                message.channel.send(embedMessage);
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