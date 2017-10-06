const Discord = require("discord.js");
exports.run = function(client, message, args) {
  const embed = new Discord.RichEmbed()
  .setTitle("Info")
  .setAuthor(message.author.username, message.author.avatarURL)
  .setColor("#BB00FF")
  .setDescription("I was made by @DynomiteCentral#4808 by hand to serve this and many more servers!\nIf you want a changelog, help devolop the bot, or even add the bot to your server, come to the official github site here: https://dynomite567.github.io/Uniqulem/\n```Current Version: v1.3.5```")
  .setThumbnail("http://i.imgur.com/Qo6BP2v.png")
  .setTimestamp()
    message.channel.send({embed});
  };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['i', 'in'],
  permLevel: 0
};

 exports.help = {
  name: 'info',
  description: 'Shows the info of the bot',
  usage: 'info'
};