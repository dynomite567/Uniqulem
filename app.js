const Discord = require("discord.js");
const client = new Discord.Client();

function commandIs(str, msg){
  return msg.content.toLowerCase().startsWith(";" + str);
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
});

client.on('message', message => {
  var args = message.content.split(/[ ]+/);
  if (commandIs ("clear", message)){
    if (hasRole(message.member, "BotMod") || hasRole(message.member, "BotAdmin")) {
      if (args.length >= 3) {
          message.channel.sendMessage('Number of messages are not defined or the number is two large! Usage: ;clear (Number of messages to delete)');
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
      message.channel.sendMessage("You are not a **BotMod** or **BotAdmin**");
    }
  }

  if (commandIs ("say", message)){
    if (hasRole(message.member, "BotMod") || hasRole(message.member, "BotAdmin")) {
      if(args.length === 1){
        message.channel.sendMessage('Please give me something to say! Usage: ;say (Message)');
      } else {
        message.channel.sendMessage(args.join(" ").substring(5));
      }
    } else {
      message.channel.sendMessage("You are not a **BotMod** or **BotAdmin**");
    }
  }


  if (commandIs ("server", message)) {
    message.channel.sendMessage('Join the official Uniqulem server here for updates and support: https://discord.gg/m4q24gX');
  }

  if (commandIs ("help", message)) {
    message.channel.sendMessage('Commands:');
    message.channel.sendMessage('``;help ;hello ;server ;info ;clear``')
  }

  if (commandIs ("hello", message)) {
    message.channel.sendMessage('Hello! I am a bot! *Beep Boop!* To find out more about me use .info!');
  }

  if (commandIs ("info", message)) {
    message.channel.sendMessage('I was made by @DynomiteCentral#4808 by hand to serve this and many more servers!');
    message.channel.sendMessage('If you want a changelog, help devolop the bot, or even add the bot to your server, come to the official github site here: https://dynomite567.github.io/Uniqulem/');
    message.channel.sendMessage('```Current Version: v1.1.2```');
  }

});

client.login('token');
