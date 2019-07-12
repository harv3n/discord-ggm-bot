const getSummonerByName = async (kayn, summonerName) => {
    try {
        let summoner = {}

        const { id, accountId, name, summonerLevel, profileIconId } = await kayn.Summoner.by.name(summonerName)
        summoner = {
            id,
            accountId,
            name,
            summonerLevel,
            profileIconId
        }

        return summoner;
    } catch (err) {
        console.error(err);
    }
}

module.exports.getSummonerByName = getSummonerByName;