require('dotenv').config();
const { token } = process.env;
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

const client = new Client({ intents: GatewayIntentBits.Guilds });
client.commands = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync('./src/functions');
functionFolders.forEach((folder) => {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith('.js'));

  functionFiles.forEach((file) => {
    require(`./functions/${folder}/${file}`)(client);
  });
});

client.handleEvents();
client.handleCommands();
client.login(token);
