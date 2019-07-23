const { championImageURI, iconsURI } = require('../../config.json');

class Champions {
    constructor(kayn) {
        this.kayn = kayn;
    }

    async freeWeekRotation() {
        const championIds = await this.kayn.Champion.Rotation.list();
        await this.getChampionById(championIds);

        return this;
    }

    async getChampionById(championIds) {
        this.freeWeek = [];

        const champions = await this.kayn.DDragon.Champion.list();

        championIds.freeChampionIds.forEach(id => {
            Object.keys(champions.data).forEach((key, index) => {
                if (champions.data[key].key == id) {
                    let championImage = champions.data[key].image.full;
                    let championName = championImage.split('.')[0]

                    this.freeWeek.push({
                        id,
                        championName
                    })
                }
            });
        });

        return this;
    }

    async sendEmbed(message, richEmbed) {
        try {
            richEmbed
                .setColor('#0099ff')
                .setTitle(`Champions free week rotation:`)
                .setDescription(`${Object.keys(this.emojis).map(key => { 
                    return `<:${this.emojis[key].name}:${this.emojis[key].id}>` 
                }).join(' ')}`)
            await message.channel.send(richEmbed);

            return this;
        } catch (err) {
            console.error(err);
        }
    }

    async createChampionsEmojis(message) {
        try {
            this.emojis = [];

            for (let champion of this.freeWeek) {
                await message.guild.createEmoji(`${championImageURI}${champion.championName}.png`, champion.championName)
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
}

module.exports = kayn => { return new Champions(kayn); }