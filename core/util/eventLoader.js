const reqEvent = (event) => require(`../events/${event}`);
module.exports = client => {
	client.on('ready', () => reqEvent('ready')(client));
	client.on('message', reqEvent('message'));
	client.on('guildDelete', reqEvent('guildDelete'));
	client.on('guildCreate', reqEvent('guildCreate'));
	client.on('guildMemberRemove', reqEvent('guildMemberRemove'));
	client.on('guildUpdate', reqEvent('guildUpdate'));
	client.on('guildBanAdd', reqEvent('guildBanAdd'));
};