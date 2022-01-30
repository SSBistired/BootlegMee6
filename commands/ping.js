const Discord = require('discord.js')

module.exports = {
    name: 'ping',
    description: 'ping command to check bot is online and responding',

    async run(BootlegMee6, message, args) {

        message.channel.send('pong!')
    }


}