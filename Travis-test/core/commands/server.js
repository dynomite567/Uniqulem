const Discord = require("discord.js");
exports.run = function(client, message, args) {
    message.channel.send(new Discord.RichEmbed().setTitle("Support Server").setAuthor(message.author.username, message.author.avatarURL).setColor("#BB00FF").setDescription("Join the official Uniqulem server here for updates and support: https://discord.gg/m4q24gX"));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['se', 'serve'],
  permLevel: 0
};

exports.help = {
  name: 'server',
  description: 'Gives the official Uniqulem server',
  usage: 'help [command]'
};