const Discord = require("discord.js");
const fs = require("fs");
const superagent = require("superagent");
const nodeschedule = require("node-schedule");
const config = require("./config.json");
const client = new Discord.Client();


var accounts = JSON.parse(fs.readFileSync("./accounts.json", "utf8"));
var daily = JSON.parse(fs.readFileSync("./daily.json", "utf8"));
var owner = "190210389496037376";

function commandIs(str, msg){
  return msg.content.toLowerCase().startsWith("{" + str);
}

function sum(x,y){
      console.log(x+y);
}

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
client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`);
  client.user.setGame(`;help | On ${client.guilds.size} guilds!`);
  superagent.post('https://bots.discordlist.net/api')
  .type('form')
  .send({'token': token})
  .send({'servers': client.guilds.size})
  .end(function(err, res) {
  if (err) {
    console.log(err)
  } else {
    console.log('Updated Guild Count on discordlist.net!')
  }
})
});

client.on('message', message => {
  var args = message.content.split(/[ ]+/);
  var account = accounts.find(function(item) {
    return item.user === message.author.id;
});

  if (commandIs ("clear", message)){
    message.delete(1);
    if (hasRole(message.member, "BotMod") || hasRole(message.member, "BotAdmin")) {
      if (args.length >= 3) {
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
  }

  if (commandIs ("say", message)){
    message.delete(1);
    if (hasRole(message.member, "BotMod") || hasRole(message.member, "BotAdmin")) {
      if(args.length === 1){
        message.channel.send(new Discord.RichEmbed().setTitle("Error").setAuthor(message.author.username, message.author.avatarURL).setColor("#ff252a").setDescription("I need something to say! Usage: ``;say (message)``"));
      } else {
        message.channel.send(args.join(" ").substring(5));
      }
    } else {
      message.channel.send(new Discord.RichEmbed().setTitle("Permision Denied").setAuthor(message.author.username, message.author.avatarURL).setColor("#ff252a").setDescription("You are not a **BotMod** or **BotAdmin**"));
    }
  }

  if (commandIs ("server", message)) {
    message.delete(1);
    message.channel.send(new Discord.RichEmbed().setTitle("Support Server").setAuthor(message.author.username, message.author.avatarURL).setColor("#BB00FF").setDescription("Join the official Uniqulem server here for updates and support: https://discord.gg/m4q24gX"));
}
  if (commandIs ("help", message)) {
    message.delete(1);
    message.channel.send(new Discord.RichEmbed().setTitle("Help").setAuthor(message.author.username, message.author.avatarURL).setColor("#BB00FF").setDescription("Here are the commands. More info about these commands can be found by clicking help above.").setFooter("Created by DynomiteCentral", "http://i.imgur.com/Qo6BP2v.png").setThumbnail("http://i.imgur.com/Qo6BP2v.png").setTimestamp().setURL("https://dynomite567.github.io/Uniqulem/").addField("Admin / Mod","``;say (message)`` ``;clear (number)``").addField("Info","``;info`` ``;hello`` ``;server`` ``;help``"));
  }

  if (commandIs ("info", message)) {
    message.delete(1);
    message.channel.send(new Discord.RichEmbed().setTitle("Info").setAuthor(message.author.username, message.author.avatarURL).setColor("#BB00FF").setDescription("I was made by @DynomiteCentral#4808 by hand to serve this and many more servers!\nIf you want a changelog, help devolop the bot, or even add the bot to your server, come to the official github site here: https://dynomite567.github.io/Uniqulem/\n```Current Version: v1.1.4b```").setThumbnail("http://i.imgur.com/Qo6BP2v.png"));
  }

});

client.login("token");
