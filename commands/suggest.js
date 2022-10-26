const { SlashCommandBuilder, EmbedBuilder, Client, Collection, channelLink} = require('discord.js');
var {client} = require("../index.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('suggest')
        .setDescription('Make a Suggestion')
        .addStringOption(option =>
            option.setName('suggestion')
                .setDescription('What would you like to suggest?')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('image')
                .setDescription('URL for an attatched image')),
    async execute(interaction) {
        await interaction.deferReply();
        const suggestion = interaction.options.getString('suggestion');
        const image = interaction.options.getString('image');
        const channel = client.channels.cache.get('1033387753913712691');
        const channelName = channel.name;
        const embed = new EmbedBuilder()
            .setColor('Orange')
            .setTitle('Suggestion')
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL()})
            .setDescription(suggestion)
            .setImage(image)
            .setTimestamp()
            .setFooter({text: 'Use /suggest to make a suggestion'});
        const message = await channel.send({ embeds: [embed] });
        message.react('✅');
        message.react('❎');
        await interaction.editReply({ content: `Suggestion Submitted! Go to <#1033387753913712691> and vote on it!`});
    }
}