const getSummonerByName = async (kayn, summonerName) => {
    try {
        let summoner = {}
        let wins = 0,
            kills = 0,
            deaths = 0,
            assists = 0

        const { id, accountId, name, summonerLevel, profileIconId } = await kayn.Summoner.by.name(summonerName)
        const leagueStats = await kayn.League.Entries.by.summonerID(id);

        const champions = await kayn.DDragon.Champion.list();
        const championMasteries = await kayn.ChampionMastery.list(id);
        const topThreeChampions = championMasteries.slice(0, 3);

        const { matches } = await kayn.Matchlist.by
            .accountID(accountId)
        const gamesIds = matches.slice(0, 10).map(({ gameId }) => gameId);
        const requests = gamesIds.map(kayn.Match.get);
        const response = await Promise.all(requests);

        summoner = {
            id,
            accountId,
            name,
            summonerLevel,
            profileIconId
        }

        // k + a / d
        response.forEach(match => {
            match.participantIdentities.forEach(participant => {
                let participantId;
                if (participant.player.summonerName === summonerName) {
                    participantId = participant.participantId;
                }

                match.participants.forEach(participant => {
                    if (participant.stats.participantId === participantId) {
                        wins += (participant.stats.win ? 1 : 0);
                        kills += participant.stats.kills;
                        deaths += participant.stats.deaths;
                        assists += participant.stats.assists;
                    }
                })
            })
        });

        summoner.tier = (leagueStats[0] ? leagueStats[0].tier : 'unranked');
        summoner.rank = (leagueStats[0] ? leagueStats[0].rank : '');
        summoner.leaguePoints = (leagueStats[0] ? leagueStats[0].leaguePoints : 0);
        summoner.wins = wins;
        summoner.kills = kills
        summoner.deaths = deaths
        summoner.assists = assists
        summoner.kda = parseFloat(((summoner.kills + summoner.assists / summoner.deaths) / 10).toFixed(2));

        summoner.championsMastery = [];
        topThreeChampions.forEach(champion => {
            let championId = champion.championId,
                championLevel = champion.championLevel,
                championPoints = champion.championPoints,
                championName = '';

                Object.keys(champions.data).forEach((key, index) => {
                    if (champions.data[key].key == championId)
                        championName = champions.data[key].id;
                });

            summoner.championsMastery.push({
                championId,
                championLevel,
                championPoints,
                championName
            })
        });



        console.log(summoner);

        console.log('log', 'request done');

        return summoner;
    } catch (err) {
        console.error(err);
    }
}

module.exports.getSummonerByName = getSummonerByName;