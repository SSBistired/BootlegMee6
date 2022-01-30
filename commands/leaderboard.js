const Discord = require('discord.js');
const Levels = require('discord-xp');

module.exports = {
    name: "leaderboard",
    aliases: ['lb'],
    description: "Leaderboard comand , shows ten highest levelled members in server, 10 can be changed to any number as long as does not exceed server count",

    async run(BootlegMEE6, message, args) {


        const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10); /// grabs top 10 users with most xp in the current server.


        if (rawLeaderboard.length < 1) return message.reply("Nobody's in leaderboard yet.");

        const leaderboard = await Levels.computeLeaderboard(BootlegMEE6, rawLeaderboard, true);
        const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`); 
        const target = message.mentions.users.first() || message.author; 

        const user = await Levels.fetch(target.id, message.guild.id, true); 

  
        const embed = new Discord.MessageEmbed()
            .setColor('#f58f00', "ORANGE")
            .setTitle("LEADERBOARD")
            .setDescription(lb.join("\n\n"))
        

        message.channel.send(embed);
    }
}