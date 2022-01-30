const Discord = require('discord.js')

module.exports = {
    name: 'help',
    description: 'returns all coded functions and how to access',

    async run(BootlegMee6, message, args) {


        const helpResponse = new Discord.MessageEmbed()
            .setColor('#f58f00', "ORANGE")
            .setTitle("Commands")
            .setDescription(` !ping - To check i\'m up and working\n\n
                              !level - Shows your rank card with progress to next level \n\n
                              !leaderboard - Shows the top ten highest levelled users in the server\n\n
                              !dropkick - Emergency shutdown command for if i'm misbehaving \n\n`)


        message.channel.send(helpResponse);

    }
}