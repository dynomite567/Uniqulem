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
	if (hasRole(message.member, "BotMod") || hasRole(message.member, "BotAdmin")) {
     if (args.length >= 2) {
		message.channel.send(new Discord.RichEmbed().setTitle("Error").setAuthor(message.author.username, message.author.avatarURL).setColor("#ff252a").setDescription("Number of messages are not defined or the number is too large! Usage: ``;clear (Number of messages to delete)``"));
      } else {
       var msg;
       if (args.length === 1){
         msg = 2;
        } else {
          msg=parseInt(args[1]);
        }
        message.channel.fetchMessages({limit: msg}).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
      }
    } else {
      message.channel.send(new Discord.RichEmbed().setTitle("Permision Denied").setAuthor(message.author.username, message.author.avatarURL).setColor("#ff252a").setDescription("You are not a **BotMod** or **BotAdmin**"));
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['c', 'cl'],
  permLevel: 0
};

exports.help = {
  name: 'clear',
  description: 'Clears a certain ammount of messages',
  usage: 'clear [number]'
};