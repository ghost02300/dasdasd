const Discord = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');

exports.run = async(client, message, args) => {

  let prefix = await require('quick.db').fetch(`prefix.${message.guild.id}`) || ayarlar.prefix



  

  
  if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('<a:cikis:848525086184570891> **Gerekli izniniz bulunmuyor**')

  
  let user = message.mentions.users.first();
  let reason = args.slice(1).join(' ');
 if (db.has(`log_${message.guild.id}`) === false) return message.channel.send(`<a:giris:848525087262113802> **Mod Log Kanalı Ayarlanmamış Ayarlamak için  | ${prefix}modlog #kanal`);
  let modlog = message.guild.channels.cache.get(db.fetch(`log_${message.guild.id}`).replace("<#", "").replace(">", ""));
  if (message.mentions.users.size < 1) return message.channel.send('<a:giris:848525087262113802> **Lütfen Kicklemek İstediğiniz Kullanıcıyı Etiketleyin**');
  if (reason.length < 1) return message.channel.send('<a:giris:848525087262113802>  **Kickleme Sebebinizi Giriniz**');
  if (user.id === message.author.id) return message.channel.send('<a:cikis:848525086184570891> **Kendini Kickleyeceğine Kendin Çıksana ?**');

  const embed = new Discord.MessageEmbed()
  .setColor("BLUE")
  .addField('İşlem', 'Sunucudan Kickleme')
  .addField('Kicklenen Üye', `${user.tag} (${user.id})`)
  .addField('Kickleyen Yetkili', `${message.author.username}#${message.author.discriminator}`)
  .addField('Kick Sebebi', "```" + reason + "```")
  modlog.send(embed);
  
  message.guild.member(user).kick();
  
  const embed2 = new Discord.MessageEmbed()
  .setColor("BLUE")
  .setDescription(`<a:giris:848525087262113802> **Kullanıcı Başarıyla Kicklendi**`)
  message.channel.send(embed2)
  
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['at','kickle'],
    permLevel: 0,//Kendi permlerinize göre ayarlayın,
  kategori:'moderasyon'
};

exports.help = {
    name: 'kick',
    description: '',
    usage: ''
};