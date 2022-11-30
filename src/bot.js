const express = require('express');
const app = express();
const http = require('http');
require('dotenv').config();
const server = http.createServer(app);

const { token } = process.env;
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

const client = new Client({ intents: GatewayIntentBits.Guilds });
client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
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
client.handleComponents();
client.login(token);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Listening on localhost:${PORT}`);
});
