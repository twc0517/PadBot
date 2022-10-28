const { SlashCommandBuilder } = require('discord.js');
const screenshotApiClient = require('screenshotapi.net')('618N9Q1-7F9M6XB-K521FBF-CB8G26V');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('streamclip')
		.setDescription('Gets the current frame of a livestream'),
	async execute(interaction) {
		screenshotApiClient.saveScreenshotToImage(`screenshot.png`, {
            url: 'https://www.youtube.com/watch?v=mhJRzQsLZGg&list=PLM5LLrSdx9qxa8Gr7yGsm00hazeChiqsd&index=1&ab_channel=NASASpaceflight',
            width: 1920,
            height: 1080,
        })
        .catch((error) => {
            console.error("Error while getting screenshot.");
            console.dir(error);
        })
	},
};