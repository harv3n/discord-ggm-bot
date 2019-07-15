const { RichEmbed } = require('discord.js');
const { Kayn, REGIONS } = require('kayn');
const { RGAPI } = require('../config.json');
const kayn = Kayn(RGAPI)({
    region: REGIONS.BRAZIL
});

const summoner = require('../src/lol/summoner');

module.exports = {
    run: async (client, message, args) => {
        try {
            console.log('log', 'request received');
            const command = args.shift();
            if (command === "summoner") {
                const summonerName = args.toString().replace(',', ' ');
                const response = await summoner.getSummonerByName(kayn, summonerName);
                // const embedMessage = new RichEmbed()
                //     .setColor('#0099ff')
                //     .setTitle(`${response.name} / Lv: ${response.summonerLevel}`)
                //     .setThumbnail('https://i.imgur.com/wSTFkRM.png')
                //     .addField(`Last 10 matches wins:`, `${response.wins}/10`, true)
                //     .addField(`KDA:`, `${response.kda}`, true)
                //     message.channel.send(embedMessage);
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