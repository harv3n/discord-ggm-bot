const { championImageURI, iconsURI } = require('../../config.json');

class Summoner {
    constructor(kayn) {
        this.summoner = {}
        this.kayn = kayn;
    }

    async getSummoner(summonerName) {
        try {
            const { id, accountId, name, summonerLevel, profileIconId } = await this.kayn.Summoner.by.name(summonerName)
    
            this.summoner.name = name;
            this.summoner.id = id;
            this.summoner.accountId = accountId;
            this.summoner.summonerLevel = summonerLevel;
            this.summoner.profileIconId = profileIconId;
    
            return this;
        } catch (err) {
            console.error(err);
        }
    }

    async getLeague() {
        try {
            this.summoner.leagueStats = {}
            const leagueStats = await this.kayn.League.Entries.by.summonerID(this.summoner.id);
            this.summoner.leagueStats.tier = (leagueStats[0] ? leagueStats[0].tier : 'unranked');
            this.summoner.leagueStats.rank = (leagueStats[0] ? leagueStats[0].rank : '');
            this.summoner.leagueStats.leaguePoints = (leagueStats[0] ? leagueStats[0].leaguePoints : 0);
    
            return this;
        } catch (err) {
            console.error(err);
        }
    }

    async getLastMatches() {
        try {
            this.summoner.wins = 0;
            this.summoner.kills = 0;
            this.summoner.deaths = 0;
            this.summoner.assists = 0;
    
            const { matches } = await this.kayn.Matchlist.by
                .accountID(this.summoner.accountId)
            const gamesIds = matches.slice(0, 10).map(({ gameId }) => gameId);
            const requests = gamesIds.map(this.kayn.Match.get);
            const response = await Promise.all(requests);

            response.forEach(match => {
                const participantId = match.participantIdentities.find(participant => participant.player.summonerName === this.summoner.name).participantId;
                const participant = match.participants.find(participant => participant.stats.participantId === participantId).stats;

                this.summoner.wins += (participant.win ? 1 : 0);
                this.summoner.kills += participant.kills;
                this.summoner.deaths += participant.deaths;
                this.summoner.assists += participant.assists;
            });
    
            this.summoner.kda = parseFloat(((this.summoner.kills + this.summoner.assists / this.summoner.deaths) / 10).toFixed(2));
    
            return this;
        } catch (err) {
            console.error(err);
        }
    }

    async getTopChampions() {
        try {
            const champions = await this.kayn.DDragon.Champion.list();
            const championMasteries = await this.kayn.ChampionMastery.list(this.summoner.id);
            const topChampions = championMasteries.slice(0, 3);
    
            this.summoner.championsMastery = [];
            topChampions.forEach(champion => {
                let championId = champion.championId,
                    championLevel = champion.championLevel,
                    championPoints = champion.championPoints,
                    championName = '',
                    championImage = '';
    
                Object.keys(champions.data).forEach((key, index) => {
                    if (champions.data[key].key == championId)
                        championName = champions.data[key].id;
                        championImage = champion.data[key].image.full;
                });

                this.summoner.championsMastery.push({
                    championId,
                    championLevel,
                    championPoints,
                    championName,
                    championImage
                })
            });
    
            return this;
        } catch (err) {
            console.error(err);
        }
    }

    async createChampionsEmojis(message) {
        try {
            this.emojis = [];

            for (let champion of this.summoner.championsMastery) {
                await message.guild.createEmoji(`${championImageURI}${champion.championImage}`, champion.championName.replace(' ', ''))
                    .then(emoji => {
                        console.log('log', `created new emoji with name ${emoji.name}`);
                        this.emojis.push(emoji);
                    })
                    .catch(console.error);
            }
        
            return this;
        } catch (err) {
            console.error(err);
        }
    }

    clearChampionsEmojis(message) {
        try {
            Object.keys(this.emojis).forEach((key, index) => {
                message.guild.deleteEmoji(this.emojis[key]);
            });
    
            return this;
        } catch (err) {
            console.error(err);
        }
    }

    async sendEmbed(message, richEmbed) {
        try {
            richEmbed
            .setColor('#0099ff')
            .setTitle(`${this.summoner.name} / Lv: ${this.summoner.summonerLevel}`)
            .setDescription(`${this.summoner.leagueStats.tier} ${this.summoner.leagueStats.rank} (${this.summoner.leagueStats.leaguePoints} pdl)`)
            .setThumbnail(`${iconsURI}${this.summoner.profileIconId}.png`)
            .addField(`Last 10 matches wins:`, `${this.summoner.wins}/10`, true)
            .addField(`KDA:`, `${this.summoner.kda}`, true)
            .addField('Most played champions:', `${this.emojis[0]} ${this.emojis[1]} ${this.emojis[2]}`, true)
            .addField('Best roles:', 'roles icon \n(roles winhate here)', true);
            await message.channel.send(richEmbed);

            return this;
        } catch (err) {
            console.error(err);
        }
    }

    logger() {
        console.log(this.summoner);

        return this;
    }
}

module.exports = kayn => { return new Summoner(kayn) };