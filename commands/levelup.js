const Discord = require('discord.js');
const Levels = require('discord-xp');


module.exports = {
    name: 'levelup',
    description: 'Level up command to increase levels potentially lost when transferring from NFT MEE6 bot',

    async run(BootlegMee6, message, args) {


        Levels.appendLevel('//UserId goes here', '//guild or serverId goes here', number of levels to increase goes here);
        

    }
}