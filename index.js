const Discord = require("discord.js")
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [30211] }); 

const config = require('./config/config.json') //Declars Config File

const token = config.token; //Decalares Token

const fs = require("fs"); //Declares Filesystem 

const prefix = config.prefix; //Prefix for the accept/reject commands

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"))  //Lays down framework for command handler
client.commands = new Discord.Collection(); //Lays down framework for command handler
for(const file of commandFiles) { //Lays down framework for command handler
    const command = require(`./commands/${file}`); //Lays down framework for command handler

    client.commands.set(command.name, command); //Lays down framework for command handler
}

let targetChannel = config.targetChannel //Sets Target Channel
let ticketChannel = config.ticketChannel //Sets Ticket Channel

client.once('ready', () => {  //Sends a message to console when the bot starts
    console.log('Ready! - Made By Woodington'); //Sends a message to console when the bot starts
});  //Sends a message to console when the bot starts

client.on('messageCreate', gotMessage); //Message Forwarding Function
function gotMessage(msg) { //Message Forwarding Function
    if (msg.channel.id === ticketChannel) { //Message Forwarding Function
        client.channels.fetch(targetChannel) //Message Forwarding Function
           .then(channel => channel.send(msg.content + `\n**Ticket ID:** ${msg.author.id}\n` + `**Mention:** <@${msg.author.id}>`)) //Message Forwarding Function
           .catch(console.error) //Catches Errors with message Forwarding
    } //Message Forwarding Function
}; //Message Forwarding Function

client.on("messageCreate", (message) => {  //Deletes Messages when sent
    if(message.channel.id == ticketChannel){ //Sets channel for message deletion 
        message.delete() //Deletes Messages when sent
    } //Deletes Messages when sent

    if(!message.content.startsWith(prefix) || message.author.bot) return; //Checks if 1) Command doesnt start with prefix, 2) If the command is sent by a bot. If either are true will not go through

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase() //Makes the command not case senstive

    if(command === "accept") { //accept command
        client.commands.get("accept").run(client, message, args); //accept command
    } //accept command
    if(command === "reject") { //reject command
        client.commands.get("reject").run(client, message, args); //reject command
    } //reject command
});   

client.login(token); 
