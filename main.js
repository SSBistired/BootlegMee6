const Discord = require('discord.js');
const BootlegMEE6 = new Discord.Client();

const mongoose = require('mongoose');
mongoose.connect('///MongoDB link goes here',
    {
        useUnifiedTopology: true,
        useNewURLParser: true,
      
    }).then(console.log('Connected to Mongoose Database'));


const { token } = require('./config.json');
const { readdirSync, read } = require('fs');
const { join } = require('path');


///Levels
const Levels = require('discord-xp');
Levels.setURL("///MongoDB serverurl goes here");
const config = require('./config.json');


//names and creates bot object
BootlegMEE6.commands = new Discord.Collection();
const commandFolders = readdirSync('./commands');

///sets up so bot knows "!" means a command, this can be changed
const prefix = '!'

///tells bot to looks for .js files in commands folder when given "!" prefix in message
for (const folder of commandFolders) {
    const commandFiles = readdirSync('./commands/.').filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);

        BootlegMEE6.commands.set(command.name, command);
    }
}

BootlegMEE6.on("error", console.error);





//posts online message when up and running
BootlegMEE6.on('ready', () => {
    console.log('Bot is online');
   
    

});


//greeting message for new members
BootlegMEE6.on('guildMemberAdd', member => {

    const channel = member.guild.channels.cache.find(channel => channel.name === "general")
    if (!channel) return;

    const ruleID = member.guild.channels.cache.find(channel => channel.name ==="rules")

    const joinembed = new Discord.MessageEmbed()
        .setTitle(`A new member just arrived!`)
        .setDescription(`Welcome to the server ${member}! Please be sure to read the ${ruleID} and feel free to ask any questions. All your marshmallows are mine!`)
        .setColor("#f58f00")

    channel.send(joinembed)
});

///goodbye message for when members leave
BootlegMEE6.on('guildMemberRemove', member => {

    const channel = member.guild.channels.cache.find(channel => channel.name === "general")
    if (!channel) return;

    const leaveembed = new Discord.MessageEmbed()
        .setTitle(`Goodbye`)
        .setDescription(`Bye ${member}!`)
        .setColor("#f58f00")

    channel.send(leaveembed)
});



BootlegMEE6.on('message', async message => {

    //prevents BootlegMEE6 or other bots from leveling up like regular users ( becuase that would be scary)
    if (message.author.bot)
        return;

    //Levels
    const randomAmountOfXp = Math.floor(Math.random() * 25) + 5; // Min xp 5, Max xp 25
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
    if (hasLeveledUp) {
        const user = await Levels.fetch(message.author.id, message.guild.id);
    
        message.channel.send(`Congratulations ${message.author}, You have leveled up to **${user.level}**! One more step towards world domination! You'll never steal my marshmallows!`);



        //number and role id can be changed as necessary if serve rhas level specific roles
        if (user.level === 1) {

            message.member.roles.add('RoleId goes here');  
        }      
       


    }

    

    
    //commands set up

    if (message.content.startsWith(prefix)) {

        const args = message.content.slice(prefix.length).split(/ + /);
        const command = args.shift().toLowerCase();

        if (!BootlegMEE6.commands.has(command))
            return;

        try {
            BootlegMEE6.commands.get(command).run(BootlegMEE6, message, args);
            
        }
        catch (error) {

            console.error;
        }

        
    }


})




BootlegMEE6.login(token);