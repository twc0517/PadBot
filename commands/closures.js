const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

let array = [];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('closures')
		.setDescription('A list of currently scheduled road closures'),
	async execute(interaction) {
		await axios.get('https://nextspaceflight.com/api/closures/')
            .then(res => {
                array = res.data;
            })
            .catch(err =>{
                console.error(err.message);
            })
        const embed = new EmbedBuilder()
            .setColor('Orange')
            .setTitle('Road Closures')
            .setURL('https://www.cameroncountytx.gov/spacex/')
            .setFooter({text: 'Use /closures to get currently scheduled road closures'});
        const arrayLength = array.length;
        for(const closure of array){
            embed.addFields({
                name: `**${closure.date}**`,
                value: `*${closure.type}*
                ${closure.time}
                ${closure.status}`
            })
        }
        await interaction.reply({embeds: [embed]});
	},
};