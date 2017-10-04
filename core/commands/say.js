const Discord = require("discord.js");
function pluck(array) {
  return array.map(function(item) { return item["name"]; });
}

function hasRole(mem, role) {
  if (pluck(mem.roles).includes(role)) {
    return true;
  } else {
    return false;
  }
}

exports.run = function(client, message, args) {
  message.delete(1);
  var args = message.content.split(/[ ]+/);
  if (hasRole(message.member, "BotMod") || hasRole(message.member, "BotAdmin")) {
    if(args.length === 1){
      message.channel.send(new Discord.RichEmbed().setTitle("Error").setAuthor(message.author.username, message.author.avatarURL).setColor("#ff252a").setDescription("I need something to say! Usage: ``;say (message)``"));
    } else {
      message.channel.send(args.join(" ").substring(5));
    }
  } else {
    message.channel.send(new Discord.RichEmbed().setTitle("Permision Denied").setAuthor(message.author.username, message.author.avatarURL).setColor("#ff252a").setDescription("You are not a **BotMod** or **BotAdmin**"));
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sey'],
  permLevel: 0
};

exports.help = {
  name: 'say',
  description: 'Makes the bot say something',
  usage: 'say [message]'
};