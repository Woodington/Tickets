const {Client, Message, MessageEmbed} = require('discord.js'); 
const fs = require('fs'); 
const config = require('../config/config.json')

module.exports = {
    name: 'accept', //sets command name
    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args
     */ 
    run: async(client, message, args) => { 
        if(!message.member.permissions.has('MANAGE_MESSAGES')) return; //Checks if user has delete messages permission 

        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0])?.user  //Sets the user to the first metioned person

        const acceptEmbed = new MessageEmbed() //Sets up the embed
        .setColor(config.acceptColor) //Sets Embed Color
        .setDescription(`Ticket Accepted By: <@${message.author.id}>`) //Embed text

        user.send({ embeds: [acceptEmbed] }) //Sends the DM
        }
    };
