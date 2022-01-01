const Discord = require('discord.js');
const db = require('croxydb');
const database = require('quick.db');
exports.run = async(client, message, args) => { 
  let prefix = (await database.fetch(`prefix_${message.guild.id}`)) || "!";
const embed = new Discord.MessageEmbed()
.setColor('BLUE')
.setTitle('<a:mavihype:848529559518314537> Premium Sistemi Komutları')
.setTimestamp()
.addField(`<a:mavihype:848529559518314537> ${prefix}sunucu-tanıt `, `Sunucunuzu Tanıtırsınız`)
.addField(`<a:mavihype:848529559518314537> ${prefix}otorol-mesaj `, `Oto Rol Mesaj Ayarlarsınız`)
.addField(`<a:mavihype:848529559518314537> ${prefix}toplu-rol-al `, `Sunucudaki Herkesten Belirtilen Rolü Alır`)
.addField(`<a:mavihype:848529559518314537> ${prefix}toplu-rol-ver `, `Sunucudaki Herkesten Belirtilen Rolü Verir`)
.addField(`<a:mavihype:848529559518314537> ${prefix}premium-oylama `, `Normal Oylama Komutu Değildir Seçenekleri Kendiniz Belirlersiniz`)
.addField(`» Hyper Bot Bağlantıları`, `[Bot Davet Linki](https://discord.com/oauth2/authorize?client_id=826542677981134859&scope=bot&permissions=8) **|** [Destek Sunucusu](https://discord.gg/4jydw2xdQQ) **|** [Oy Linki](https://botsfordiscord.com/bot/826542677981134859/vote) **|**`)
.setFooter('Hyper', client.user.avatarURL())
.setTimestamp()
.setThumbnail(client.user.avatarURL())
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ["premium-yardım","premiumyardım","premiumsistemi"], 
  permLevel: 0 
};

exports.help = {
  name: 'premium-sistemi',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım'
};