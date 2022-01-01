const Discord = require('discord.js')
const fs = require('fs');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => { 

  if(message.author.id !== '690465699201810433')
    
      return;

 const args0 = args[0];
  if(!args0) {
    message.channel.send("<a:cikis:848525086184570891> Sunucu **ID** yazmalısın!")
  } else {
  
 
db.delete(`premod_${args0}`,"deaktif")
message.channel.send("<a:giris:848525087262113802> Başarıyla premium alındı.")
 
}
};


exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['premium-al'],
    permLevel: 0,
      
}

exports.help = {
    name: 'premiumal',
    description: 'premiumal',
    usage: 'premiumal',

}