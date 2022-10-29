const { SlashCommandBuilder, Attachment } = require('discord.js');
const webshot = require('webshot-node');

const starbaseLive = 'https://youtu.be/mhJRzQsLZGg'

module.exports = {
	data: new SlashCommandBuilder()
		.setName('streamclip')
		.setDescription('Gets the current frame of a livestream'),
	async execute(interaction) {
        await interaction.deferReply();
        webshot('https://youtu.be/Lwc1owVFs94', 'screenshot.png', {/*renderDelay: 10000, takeShotOnCallback: true*/}, function(err) {
        if (!err) {
            console.log('Screenshot taken!');
            interaction.editReply({files: ['./screenshot.png']});
        }
        });
	},
};