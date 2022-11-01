const { SlashCommandBuilder, Attachment } = require('discord.js');
const fs = require('fs');
const ytdl = require('ytdl-core');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
const ffprobe = require('@ffprobe-installer/ffprobe');
const { ConsoleMessage } = require('puppeteer');
ffmpeg.setFfprobePath(ffprobePath);

const streams = {
'starbaseLive' : 'https://youtu.be/mhJRzQsLZGg',
'labMultiPlex' : 'https://youtu.be/w2BQKCnPkIc',
'nerdle' : 'https://youtu.be/Lwc1owVFs94',
'rover' : 'https://youtu.be/0jh1PJk1dic',
'rover2' : 'https://youtu.be/nbBeoReu12E',
'lab' : 'https://youtu.be/Prpv56hRYtM',
'sentinel' : 'https://youtu.be/Bm0uq-ohQ9k',
'raptorRoost' : 'https://youtu.be/PXpGvSn_T6Y',
'sapphire' : 'https://youtu.be/K0iL6oIHU3U',
'predator2' : 'https://youtu.be/VtSbnY8ETpE',
'spaceCoastLive' : 'https://youtu.be/gnt2wZBg89g',
'gator' : 'https://youtu.be/brRV2hnQ_cw',
'mcgregorLive' : 'https://youtu.be/cOmmvhDQ2HM'
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('streamclip')
		.setDescription('Gets the current frame of a livestream')
        .addStringOption(option =>
            option.setName('stream')
                .setDescription('Choose 24/7 stream')
                .addChoices(
                    {name: 'Starbase Live', value: 'starbaseLive'},
                    {name: 'LabPadre Multi Plex', value: 'labMultiPlex'},
                    {name: 'Nerdle Cam', value: 'nerdle'},
                    {name: 'Rover Cam', value: 'rover'},
                    {name: 'Rover 2.0 Cam', value: 'rover2'},
                    {name: 'Lab Cam', value: 'lab'},
                    {name: 'Sentinel Cam', value: 'sentinel'},
                    {name: 'Raptor Roost Cam', value: 'raptorRoost'},
                    {name: 'Sapphire Cam', value: 'sapphire'},
                    {name: 'Predator 2.0 Cam', value: 'predator2'},
                    {name: 'Space Coast Live', value: 'spaceCoastLive'},
                    {name: 'Gator Cam', value: 'gator'},
                    {name: 'McGregor Live', value: 'mcgregorLive'}
                ))
        .addStringOption(option =>
            option.setName('url')
                .setDescription('Livestream URL')),

	async execute(interaction) {
        var streamChoice = interaction.options.getString('stream');
        var urlChoice = interaction.options.getString('url');
        console.log(streamChoice);
        console.log(urlChoice);

        if (streamChoice == null && urlChoice == null){
            await interaction.reply('You must either choose a 24/7 stream or input a livestream URL');
            var check = false;
        }
        else if(streamChoice != null){
            streamURL = streams[streamChoice];
            var check = true;
        }
        else if(urlChoice != null){
            streamURL = urlChoice
            var check = true;
        }
        if(check == true){
            await interaction.deferReply();
            const videoFile = fs.createWriteStream('./video.mp4');
            ytdl(streamURL, {liveBuffer: '20000', begin:'7s'})
                .pipe(videoFile);
            setTimeout(getFrame, 10000);    
            await new Promise(resolve => setTimeout(resolve, 11000));
            await interaction.editReply({files: ['./frame.png']});
            fs.unlink('./frame.png', (err) => {
                if (err) {
                  console.error(err)
                  return
                }
            });
            videoFile.close(); 
        }
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
            timestamps: ['80%'],
            filename: './frame.png',
        });
}