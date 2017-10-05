module.exports = (guild, member) => {
  let guild = member.guild;
  guild.defaultChannel.send(`Goodbye${member.user.username}...`);
};