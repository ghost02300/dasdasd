const Discord = require('discord.js');
const db = require('croxydb');
const database = require('quick.db');
exports.run = async(client, message, args) => { 
  let prefix = (await database.fetch(`prefix_${message.guild.id}`)) || "!";
const embed = new Discord.MessageEmbed()
.setColor('BLUE')
.setTitle('<a:mavihype:848529559518314537> Guard Sistemi Komutları')
.setTimestamp()
.addField(`<a:mavihype:848529559518314537> ${prefix}kanal-koruma `, `Açılan Kanalı Siler / Silinen Kanalı Tekrar Açar`)
.addField(`<a:mavihype:848529559518314537> ${prefix}reklam-engel `, `Atılan Linki Siler`)
.addField(`<a:mavihype:848529559518314537> ${prefix}rol-koruma`, `Açılan Rolü Siler / Silinen Rolü Tekrar Açar`)
.addField(`<a:mavihype:848529559518314537> ${prefix}bot-koruma`, `Sunucuya Giren Botları Sunucudan Atar Siz İzin Verene Kadar`)
.addField(`» Hyper Bot Bağlantıları`, `[Bot Davet Linki](https://discord.com/oauth2/authorize?client_id=826542677981134859&scope=bot&permissions=8) **|** [Destek Sunucusu](https://discord.gg/4jydw2xdQQ) **|** [Oy Linki](https://botsfordiscord.com/bot/826542677981134859/vote) **|**`)
.setFooter('Hyper', client.user.avatarURL())
.setTimestamp()
.setThumbnail(client.user.avatarURL())
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ["guard-yardım","guardyardım","guardsistemi"], 
  permLevel: 0 
};

exports.help = {
  name: 'guard',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım'
};