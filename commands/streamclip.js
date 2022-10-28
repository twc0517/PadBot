const { SlashCommandBuilder, Attachment } = require('discord.js');
var Youtube = require('youtube.com');

var youtube = Youtube('https://youtu.be/Tk338VXcb24');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('streamclip')
		.setDescription('Gets the current frame of a livestream'),
	async execute(interaction) {
        await interaction.deferReply();
		youtube.snapshot('0:05', './screenshot.jpg')
        .then(function () {
            console.log("Done");
        }).catch(function (err) {
            console.log("err : ", err)
        });
        await interaction.editReply({files: ['./screenshot.jpg']});
	},
};