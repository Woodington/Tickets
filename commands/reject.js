const {Client, Message, MessageEmbed} = require('discord.js'); 
const fs = require('fs'); 
const config = require('../config/config.json')

module.exports = {
    name: 'reject', //sets command name
    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args
     */  

    run: async(client, message, args) => {  

        if(!message.member.permissions.has('MANAGE_MESSAGES')) return; //Checks if user has delete messages permission 

        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0])?.user //Sets the user to the first metioned person

        const str = args.slice(1).join(' ') //Removes the user ID from the DM 

        const rejectEmbed = new MessageEmbed() //Sets up the embed
        .setColor(config.rejectColor)   //Sets embed color
        .setDescription(`Ticket Rejected\n**Reason:** ${str}`) //sets embed message

        user.send({ embeds: [rejectEmbed] }) //Sends the DM
        }
    };
