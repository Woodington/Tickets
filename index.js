const Discord = require("discord.js")
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [30211] }); 

const prefix = "-" 


const fs = require("fs");

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js")) 
client.commands = new Discord.Collection();  
for(const file of commandFiles) { 
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

let myChannel = '909236971065442345' 
let ticketChannel = '909236956309884998'

client.once('ready', () => { 
    console.log('Ready! - Made By Woodington');
});  

client.on('messageCreate', gotMessage);
function gotMessage(msg) { 
    if (msg.channel.id === ticketChannel) { 
        client.channels.fetch(myChannel)
           .then(channel => channel.send(msg.content + `\n**Ticket ID:** ${msg.author.id}\n` + `**Mention:** <@${msg.author.id}>`))
           .catch(console.error)
    }
};

client.on("messageCreate", (message) => { 
    if(message.channel.id == "909236956309884998"){
        message.delete()
    }
});   


client.on('messageCreate', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return; 

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase()

    if(command === "accept") {
        client.commands.get("accept").run(client, message, args);
    } 
    if(command === "reject") {
        client.commands.get("reject").run(client, message, args);
    }
});

client.login("OTA3Mzc2OTYzNTYyNDAxODIy.YYmSpg.UaO9U2Z-omjHevhL_Q3eKaXsCls"); 