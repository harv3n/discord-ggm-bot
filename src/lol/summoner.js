const getSummonerByName = async (kayn, summonerName) => {
    try {
        let summoner = {}
        let wins = 0,
            kills = 0,
            deaths = 0,
            assists = 0
        const { id, accountId, name, summonerLevel, profileIconId } = await kayn.Summoner.by.name(summonerName)
        const icons = await kayn.DDragon.ProfileIcon.list()
        // const icon = icons.data.map(icon => {
        //     if (icon.id === profileIconId) return icon;
        // })
        icons.data.map(icon => {
            console.log('++++++++++++++', icon);
        });
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

        summoner.wins = wins;
        summoner.kills = kills
        summoner.deaths = deaths
        summoner.assists = assists
        summoner.kda = parseFloat(((summoner.kills + summoner.assists / summoner.deaths) / 10).toFixed(2));

        console.log(summoner);

        return summoner;
    } catch (err) {
        console.error(err);
    }
}

module.exports.getSummonerByName = getSummonerByName;