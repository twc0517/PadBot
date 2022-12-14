const { SlashCommandBuilder, Attachment } = require('discord.js');
const fs = require('fs');
const ytdl = require('ytdl-core');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
const ffprobe = require('@ffprobe-installer/ffprobe');
const { Resolver } = require('dns');
ffmpeg.setFfprobePath(ffprobePath);

const streams = {
'NSF Starbase Live' : 'https://youtu.be/mhJRzQsLZGg',
'LabPadre Multi Plex' : 'https://youtu.be/w2BQKCnPkIc',
'LabPadre Nerdle Cam' : 'https://youtu.be/Lwc1owVFs94',
'LabPadre Rover Cam' : 'https://youtu.be/0jh1PJk1dic',
'LabPadre Rover 2.0 Cam' : 'https://youtu.be/nbBeoReu12E',
'LabPadre Lab Cam' : 'https://youtu.be/Prpv56hRYtM',
'LabPadre Sentinel Cam' : 'https://youtu.be/Bm0uq-ohQ9k',
'LabPadre Raptor Roost Cam' : 'https://youtu.be/PXpGvSn_T6Y',
'LabPadre Sapphire Cam' : 'https://youtu.be/K0iL6oIHU3U',
'LabPadre Predator 2.0 Cam' : 'https://youtu.be/VtSbnY8ETpE',
'NSF Space Coast Live' : 'https://youtu.be/gnt2wZBg89g',
'LabPadre Gator Cam' : 'https://youtu.be/brRV2hnQ_cw',
'NSF McGregor Live' : 'https://youtu.be/cOmmvhDQ2HM'
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('streamclip')
		.setDescription('Gets the current frame of a livestream')
        .addStringOption(option =>
            option.setName('stream')
                .setDescription('Choose 24/7 stream')
                .addChoices( //name = Choice display in command, value = photo credit name
                    {name: 'Starbase Live', value: 'NSF Starbase Live'},
                    {name: 'LabPadre Multi Plex', value: 'LabPadre Multi Plex'},
                    {name: 'Nerdle Cam', value: 'LabPadre Nerdle Cam'},
                    {name: 'Rover Cam', value: 'LabPadre Rover Cam'},
                    {name: 'Rover 2.0 Cam', value: 'LabPadre Rover 2.0 Cam'},
                    {name: 'Lab Cam', value: 'LabPadre Lab Cam'},
                    {name: 'Sentinel Cam', value: 'LabPadre Sentinel Cam'},
                    {name: 'Raptor Roost Cam', value: 'LabPadre Raptor Roost Cam'},
                    {name: 'Sapphire Cam', value: 'LabPadre Sapphire Cam'},
                    {name: 'Predator 2.0 Cam', value: 'LabPadre Predator 2.0 Cam'},
                    {name: 'Space Coast Live', value: 'NSF Space Coast Live'},
                    {name: 'Gator Cam', value: 'LabPadre Gator Cam'},
                    {name: 'McGregor Live', value: 'NSF McGregor Live'}
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
            var photoCredit = `:camera_with_flash:: ${streamChoice}`;
        }
        else if(urlChoice != null){
            streamURL = urlChoice
            var check = true;
            var photoCredit = `:camera_with_flash:: <${urlChoice}>`;
        }
        if(check == true){
            await interaction.deferReply();
            console.log(streamURL);
            const videoFile = fs.createWriteStream('./video.mp4');
            ytdl(streamURL, {liveBuffer: '20000', begin:'7s'})
                .pipe(videoFile)
            setTimeout( () =>
                getFrame()
                    .then(() =>{
                        sendIt();
                    }), 10000);
            async function sendIt(){
                await new Promise(resolve => setTimeout(resolve, 10000));
                await interaction.editReply({files: ['./frame.png']});
                await interaction.channel.send(photoCredit);
                fs.unlink('./frame.png', (err) => {
                    if (err) {
                    console.error(err)
                    return
                    }
                });
                videoFile.close(); 
            }
        }
	},
};

async function getFrame() {
    return new Promise((resolve, reject) => {
        ffmpeg('./video.mp4')
            .on('end', function() {
                console.log('Screenshots taken');
                resolve('done');
            })
            .on('error', function(err) {
                console.error(err);
                })
            .screenshots({
                timestamps: ['80%'],
                filename: './frame.png',
            });
    })
}