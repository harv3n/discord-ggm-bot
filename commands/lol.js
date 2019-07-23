const { RichEmbed } = require('discord.js');
const embedMessage = new RichEmbed();

const { RGAPI } = require('../config.json');
const { Kayn, REGIONS } = require('kayn');

const kayn = Kayn(RGAPI)({
    region: REGIONS.BRAZIL
});

const Summoner = require('../src/lol/Summoner')(kayn);
const Champions = require('../src/lol/Champions')(kayn);

module.exports = {
    run: async (client, message, args) => {
        try {
            const command = args.shift();
            if (command === "summoner") {
                const summonerName = args.join(' ');
                
                await Summoner.getSummoner(summonerName)
                    .then(res => res.getLeague())
                    .then(res => res.getLastMatches())
                    .then(res => res.getTopChampions())
                    .then(res => res.createChampionsEmojis(message))
                    .then(res => res.sendEmbed(message, embedMessage))
                    .then(res => res.clearChampionsEmojis(message))
                    .then(res => res.logger());
            }

            if (command === "freeweek") {
                console.log('freeweek')
                await Champions.freeWeekRotation()
                    .then(res => res.createChampionsEmojis(message))
                    .then(res => res.sendEmbed(message, embedMessage))
                    .then(res => res.clearChampionsEmojis(message));
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