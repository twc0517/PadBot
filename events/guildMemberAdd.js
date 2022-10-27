const { EmbedBuilder } = require('@discordjs/builders');
const { Events } = require('discord.js');
var {client} = require("../index.js");

module.exports = {
	name: Events.guildMemberAdd,
	async execute(GuildMember) {
        const member = GuildMember;
        const memberId = member.id;
        const channel = client.channels.cache.get('1033370496227623015');
        const embed = new EmbedBuilder()
            .setColor('Orange')
            .setTitle(`Welcome, <@${memberId}>!`)
            .setDescription('Check out <#1033446150751142018> to set up notifications and join the conversation in <#1033370693347328061>!')
            .setAuthor({ iconURL: member.avatar})
            .addFields(
                { name: 'Member Count', value: member.guild.memberCount, inline: true},
                { name: 'Invite Link', value: 'https://discord.gg/bCSWvcfjQD', inline: true}
            )
            .addFimestamp();
        await channel.send({ embeds: [embed] });
    },
};