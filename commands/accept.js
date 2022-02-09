const {Client, Message, MessageEmbed} = require('discord.js'); 
const fs = require('fs'); 
const config = require('../config/config.json')

module.exports = {
    name: 'accept', 
    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args
     */ 
    run: async(client, message, args) => { 
        if(!message.member.permissions.has('MANAGE_MESSAGES')) return; 

        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0])?.user  

        const acceptEmbed = new MessageEmbed() 
        .setColor(config.acceptColor) 
        .setDescription(`Ticket Accepted By: <@${message.author.id}>`) 

        user.send({ embeds: [acceptEmbed] }) 
        }
    };
