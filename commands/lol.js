const { Kayn, REGIONS } = require('kayn');
const { RGAPI } = require('../config.json');
const kayn = Kayn(RGAPI)({
    region: REGIONS.BRAZIL
});

const summoner = require('../src/lol/summoner');

module.exports = {
    run: async (client, message, args) => {
        try {
            const command = args.shift();
            if (command === "summoner") {
                const summonerName = args.toString().replace(',', ' ');
                const response = await summoner.getSummonerByName(kayn, summonerName)
                message.channel.send(`Nome do invocador: ${response.name} / Level: ${response.summonerLevel}`);
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