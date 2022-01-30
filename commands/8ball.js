const Discord = require('discord.js')

module.exports = {
    name: '8ball',
    description: 'randomised 8ball for answers',

    async run(BootlegMEE6, message, args) {

       

        let replies = ['Yes', 'Outlook seems good.', 'Of course', 'Outlook not good', 'No way', 'I can\'t tell you that answer for legal reasons'];
        
        let result = Math.floor((Math.random() * replies.length));
        

        
        message.channel.send(replies[result])
    }

}