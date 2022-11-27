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

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply(`${interaction}`);
	}
});

client.login(process.env.token);

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
