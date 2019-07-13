const getSummonerByName = async (kayn, summonerName) => {
    try {
        let summoner = {}
        const { id, accountId, name, summonerLevel, profileIconId } = await kayn.Summoner.by.name(summonerName)
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
                    console.log('nome', participant.player.summonerName);
                    console.log('participantId', participantId);
                }

                match.participants.forEach(participant => {
                    if (participant.stats.participantId === participantId) {
                        summoner.wins += (participant.stats.win === true ? 1 : 0);
                        summoner.kills += participant.stats.kill;
                        summoner.deaths += participant.stats.death;
                        summoner.assists += participant.stats.assists;
                    }
                })
            })
        });

        summoner.kda = summoner.kills + summoner.assists / summoner.deaths;

        console.log(summoner);

        return summoner;
    } catch (err) {
        console.error(err);
    }
}

module.exports.getSummonerByName = getSummonerByName;