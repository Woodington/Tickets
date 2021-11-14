const {Client, Message, MessageEmbed} = require('discord.js');

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

        user.send(`Ticket Accepted By: **${message.author.tag}**`)
        }
    };