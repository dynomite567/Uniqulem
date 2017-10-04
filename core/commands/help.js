const Discord = require("discord.js");
const config = require('../config.json')
exports.run = function(client, message, params) {
  if (!params[0]) {
    const embed = new Discord.RichEmbed()
      .setTitle("Help")
      .setAuthor(message.author.username, message.author.avatarURL)
      .setColor("#BB00FF")
      .setDescription("Here are the commands. More info about these commands can be found by clicking help above.")
      .setFooter("Created by DynomiteCentral", "http://i.imgur.com/Qo6BP2v.png")
      .setThumbnail("http://i.imgur.com/Qo6BP2v.png")
      .setTimestamp()
      .setURL("https://dynomite567.github.io/Uniqulem/")
      .addField("Admin / Mod","``;say (message)`` ``;clear (number)``")
      .addField("Info","``;info`` ``;server`` ``;help``")
    message.channel.send({embed});
  } else {
    let command = params[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.channel.send(new Discord.RichEmbed()
       .setTitle(`${command.help.name}`)
       .setAuthor(message.author.username, message.author.avatarURL)
       .setColor("#BB00FF")
       .setThumbnail("http://i.imgur.com/Qo6BP2v.png")
        .setTimestamp()
        .addField("Info",`${command.help.description}`)
        .addField("Usage",`${command.help.usage}`));
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['h'],
  permLevel: 0
};

 exports.help = {
  name: 'help',
  description: 'Displays all the available commands inculding details with a command specified.',
  usage: 'help [command]'
};