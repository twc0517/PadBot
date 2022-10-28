const { SlashCommandBuilder, Attachment } = require('discord.js');
const puppeteer = require("puppeteer");

const starbaseLive = 'https://youtu.be/mhJRzQsLZGg'

module.exports = {
	data: new SlashCommandBuilder()
		.setName('streamclip')
		.setDescription('Gets the current frame of a livestream'),
	async execute(interaction) {
        await interaction.deferReply();
		const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(starbaseLive);
        await page.screenshot({ path: "./screenshot.png", /*clip: { x: 0, y: 0, height: 841, width: 473 }*/});
        await browser.close();
        await interaction.editReply({files: ['./screenshot.png']});
	},
};