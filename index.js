const Discord = require("discord.js")
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [30211] }); 

const config = require('./config/config.json') 

const token = config.token; 

const fs = require("fs"); 

const prefix = config.prefix; 

//Lay down command handler framework
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"))  
client.commands = new Discord.Collection(); 
for(const file of commandFiles) { 
    const command = require(`./commands/${file}`); 

    client.commands.set(command.name, command); 
}

let targetChannel = config.targetChannel 
let ticketChannel = config.ticketChannel 

client.once('ready', () => {  
    console.log('Ready! - Made By Woodington'); 
});  

//Message forwarding
client.on('messageCreate', gotMessage
function gotMessage(msg) { 
    if (msg.channel.id === ticketChannel) { 
        client.channels.fetch(targetChannel) 
           .then(channel => channel.send(msg.content + `\n**Ticket ID:** ${msg.author.id}\n` + `**Mention:** <@${msg.author.id}>`)) 
           .catch(console.error) 
    } 
}; 

//Delete ticket channel messages
client.on("messageCreate", (message) => { 
    if(message.channel.id == ticketChannel){ 
        message.delete() 
    } 

    if(!message.content.startsWith(prefix) || message.author.bot) return; 

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase() 

    if(command === "accept") { //accept command
        client.commands.get("accept").run(client, message, args); 
    } //accept command
    if(command === "reject") { 
        client.commands.get("reject").run(client, message, args); 
    } 
});   

client.login(token); 
