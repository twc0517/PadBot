const fs = require('node:fs');
const path = require('node:path');
const dotenv = require('dotenv');
const { Client, Collection, GatewayIntentBits, IntentsBitField, Events} = require('discord.js');
dotenv.config();

//Client and Intents declaration
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildMembers,
        
    ]
})

module.exports = {client};

//Command Handler (link at bottom)
client.commands = new Collection(); 

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles){
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command){
        client.commands.set(command.data.name, command);
    }
    else{
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`)
    }
}

//Event Handler
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

//Ping Pong
client.on('messageCreate', (message) => {
    if(message.content === 'ping'){
        message.reply('pong')
    }
})

client.login(process.env.TOKEN)

/*
REFERENCE LINKS:
Command Handler: https://discordjs.guide/creating-your-bot/command-handling.html#loading-command-files

*/