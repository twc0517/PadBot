const { Events, EmbedBuilder } = require('discord.js');
var {client} = require("../index.js");

module.exports = {
	name: Events.GuildMemberAdd,
	async execute(GuildMember) {
        console.log('1');
        const member = GuildMember;
        console.log('2');
        const memberId = member.id;
        console.log('3');
        const channel = client.channels.cache.get('1033370496227623015');
        const memberCount = member.guild.memberCount;
        console.log('4');
        const embed = new EmbedBuilder()
            .setColor('Orange')
            .setTitle(`Welcome, ${member.displayName}!`)
            .setDescription('Check out <#1033446150751142018> to set up notifications and join the conversation in <#1033370693347328061>!')
            .setAuthor({ name: 'Spaceflight Vibes', iconURL: member.guild.iconURL()})
            .setThumbnail(member.displayAvatarURL())
            .addFields(
                { name: 'Member Count', value: `${memberCount}`, inline: true },
                { name: 'Invite Link', value: 'https://discord.gg/bCSWvcfjQD', inline: true },
            )
            .setTimestamp();
        console.log('5');
        await channel.send({ content: `${member}`, embeds: [embed] });
    },
};