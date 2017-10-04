const Discord = require("discord.js");
const fs = require("fs");
const Raven = require('raven');
const superagent = require("superagent");
const nodeschedule = require("node-schedule");
const http = require('http');
const express = require('express');
const moment = require('moment');
const chalk = require('chalk');
const config = require('./core/config.json');
const client = new Discord.Client();
require('./core/util/eventLoader')(client);

var accounts = JSON.parse(fs.readFileSync("./accounts.json", "utf8"));
var daily = JSON.parse(fs.readFileSync("./daily.json", "utf8"));

function sum(x,y){
      console.log(x+y);
}

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./core/commands/', (err, files) => {
  if (err) console.error(err);
  log(`Loading a total of ${files.length} commands.`);
  files.forEach(f => {
    let props = require(`./core/commands/${f}`);
    log(`Loading Command: ${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./core/commands/${command}`)];
      let cmd = require(`./core/commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = message => {
  let permlvl = 0;
  let mod_role = message.guild.roles.find('name', config.modrolename);
  if (mod_role && message.member.roles.has(mod_role.id)) permlvl = 2;
  let admin_role = message.guild.roles.find('name', config.adminrolename);
  if (admin_role && message.member.roles.has(admin_role.id)) permlvl = 3;
  if (message.author.id === config.ownerid) permlvl = 4;
  return permlvl;
};

client.login(config.token);
