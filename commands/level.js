const Discord = require('discord.js');
const Levels = require('discord-xp');
const canvacord = require('canvacord');

module.exports = {
    name: 'level',
    description: 'Level/rank card command',

    async run(BootlegMee6, message, args) {

        const target = message.mentions.users.first() || message.author; // Grab the target.

        const user = await Levels.fetch(target.id, message.guild.id, true); // Selects the target from the database.

        if (!user) return message.channel.send("Seems like this user has not earned any xp so far."); // If there isnt such user in the database, we send a message in general.

        const neededXp = Levels.xpFor(parseInt(user.level) + 1)

        const img = "//preferred background image for level card url goes here";

        const rank = new canvacord.Rank()
            .setAvatar(target.displayAvatarURL({ dynamic: false, format: 'png' }))
            .setBackground("IMAGE", img)
            .setRank(user.position)
            .setLevel(user.level)
            .setCurrentXP(user.xp)
            .setRequiredXP(neededXp)
            .setStatus(target.presence.status)
            .setProgressBar("#f58f00", "COLOR")
            .setUsername(target.username)
            .setDiscriminator(target.discriminator);

        rank.build()
            .then(data => {
                const attachment = new Discord.MessageAttachment(data, "RankCard.png");
                message.channel.send(attachment);
            });
    }
}

      
    


