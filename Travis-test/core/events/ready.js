module.exports = client => {
  console.log(`Logged in as ${client.user.username}!`);
  client.user.setGame(`;help | On ${client.guilds.size} guilds!`);
};