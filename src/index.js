const express = require('express');
const app = express();
const port = 3000;
const http = require('http');
require('dotenv').config();
const server = http.createServer(app);
const { Client, GatewayIntentBits, channelLink, GuildChannel, createChannel } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });


client.once('ready', () => {
	console.log('Bot is ready Ready!');
    console.log('===================');
});

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

	switch (commandName) {
		case 'ping':
			await interaction.reply('Pong!');
			break;
		case 'schedule':
			await showSchedule(interaction);
			break;
		default:
			break;
	}
});

const showSchedule = (interaction) => {
	interaction.reply(`
		**MONDAY** | **TUESDAY** | **WEDNESDAY** | **THURSDAY** | **FRIDAY**
	`);
};

client.login(process.env.token);

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
