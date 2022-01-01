const Discord = require('discord.js');
const db = require('croxydb');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
  
const soulcastle = args[0]
if (!soulcastle) {
const embed = new Discord.MessageEmbed()
.setDescription(`Abone sistemini açmak için ${ayarlar.prefix}**Abone-sistemi aç** veya ${ayarlar.prefix}**abone-sistemi kapat** yazmalısın!`)
.setColor('RED')
return message.channel.send(embed)
}
 
if (soulcastle == 'aç') { 
let açıkkapalı = await db.fetch(`abonesistem_${message.guild.id}`)
db.set(`abonesistem_${message.guild.id}`,'açık')
  
const embed = new Discord.MessageEmbed()
.setDescription(`Abone Sistemi Başarıyla Açıldı!`)
.setColor('GREEN')
return message.channel.send(embed)
}
  
if (soulcastle == 'kapat') {
let açıkkapalı = await db.fetch(`abonesistem_${message.guild.id}`)
db.delete(`abonesistem_${message.guild.id}`)
db.delete(`abonerol_${message.guild.id}`)
db.delete(`abonelog_${message.guild.id}`)
db.delete(`aboneyetkilirol_${message.guild.id}`)

const embed = new Discord.MessageEmbed()
.setDescription(`Abone Sistemi Başarıyla Kapatıldı!`)
.setColor('GREEN')
return message.channel.send(embed)
}
  
};

exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};
exports.help = {
  name: 'abone-sistem',
  description: 'js sistemini açar',
  usage: 'js-sistem'
}
