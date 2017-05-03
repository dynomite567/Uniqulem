const Discord = require("discord.js");
const client = new Discord.Client();

const config = require("./config.json");

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`);
});

client.on("guildMemberAdd", member => {
  let guid = member.guild;
  guild.defaultChannel.sendMessage("${member.user} has joined the server! Welcome!")
}
client.on('message', msg => {
  if (msg.author.bot) return;
  if (!msg.content.startsWith(config.prefix)) return;

  let command = message.content.split(" ").[0];
  command = command.slice(config.prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command === "clear") {
      if (hasRole(message.member, "Mod") || hasRole(message.member, "Owner")){
        if (args.length === 1){
          message.channel.sendMessage('Too many messages to clear! Usage: .clear (Number of messages to delete)');
        } else {
          var msg;
          if(args.length === 1){
            msg=2;
          } else {
            msg=parseInt(args[1]);
          }
          message.channel.fetchMessages((limit: msg)).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
          message.channel.sendMessage('Messages deleted! (Please manualy delete this message, in the future this will automaticly delete)');
        } else {
          message.channel.sendMessage("You do not have sufficient permisions to perform this command")
        }
      }
  }

  if (command === "server") {
    msg.channel.sendMessage('Join the official Uniqulem server here for updates and support: https://discord.gg/m4q24gX');
  }

  if (command === "hello") {
    msg.channel.sendMessage('Hello! I am a bot! *Beep Boop!* To find out more about me use .info!');
  }

  if (command === "info") {
    msg.channel.sendMessage('I was made by @DynomiteCentral#4808 by hand to serve this and many more servers!');
    msg.channel.sendMessage('If you want a changelog, help devolop the bot, or even add the bot to your server, come to the official github site here: https://dynomite567.github.io/Uniqulem/');
    msg.channel.sendMessage('```Current Version: v1.0.2```')
  }
});

client.login('config.token');
