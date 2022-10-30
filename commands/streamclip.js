const { SlashCommandBuilder, Attachment } = require('discord.js');
const fs = require('fs');
const ytdl = require('ytdl-core');
const extractFrames = require('ffmpeg-extract-frames-quality');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
const ffprobe = require('@ffprobe-installer/ffprobe');
ffmpeg.setFfprobePath(ffprobePath);

const starbaseLive = 'https://youtu.be/mhJRzQsLZGg'

module.exports = {
	data: new SlashCommandBuilder()
		.setName('streamclip')
		.setDescription('Gets the current frame of a livestream'),
	async execute(interaction) {
        await interaction.deferReply();
        ytdl(starbaseLive, {liveBuffer: '2000', begin:'7s'})
            .pipe(fs.createWriteStream('video.mp4'));
        setTimeout(getFrame, 8000);    
        await new Promise(resolve => setTimeout(resolve, 15000));
        await interaction.editReply({files: ['./frame.png']});
	},
};

async function getFrame() {
    ffmpeg('./video.mp4')
        .on('end', function() {
            console.log('Screenshots taken');})
        .on('error', function(err) {
            console.error(err);
            })
        .screenshots({
            timestamps: ['90%'],
            filename: './frame.png',
        });
}