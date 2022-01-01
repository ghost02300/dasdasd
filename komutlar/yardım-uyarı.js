const Discord = require('discord.js');
const db = require('croxydb');
const database = require('quick.db');
exports.run = async(client, message, args) => { 
  let prefix = (await database.fetch(`prefix_${message.guild.id}`)) || "!";
const embed = new Discord.MessageEmbed()
.setColor('BLUE')
.setTitle('<a:mavihype:848529559518314537> Uyarı Sistemi Komutları')
.setTimestamp()
.addField(`<a:mavihype:848529559518314537> ${prefix}uyarı-log `, `Uyarıların Tutulacağı Kanalı Ayarlarınız`)
.addField(`<a:mavihype:848529559518314537> ${prefix}uyarı-sorgula `, `Etiketlediğiniz Kişinin Uyarılarını Sorgularsınız`)
.addField(`<a:mavihype:848529559518314537> ${prefix}uyar`, `Kişiyi Uyarırsınız`)
.addField(`<a:mavihype:848529559518314537> ${prefix}uyarılarım`, `Kendi Uyarılarınızı Gösterir`)
.addField(`<a:mavihype:848529559518314537> ${prefix}uyarı-ayarlar`, `Yapılanlar Ayarları Gösterir`)
.addField(`<a:mavihype:848529559518314537> ${prefix}uyarı-sıfırla`, `Kişinin Uyarılarını Sıfırlarsınız`)
.addField(`» Hyper Bot Bağlantıları`, `[Bot Davet Linki](https://discord.com/oauth2/authorize?client_id=826542677981134859&scope=bot&permissions=8) **|** [Destek Sunucusu](https://discord.gg/4jydw2xdQQ) **|** [Oy Linki](https://botsfordiscord.com/bot/826542677981134859/vote) **|**`)
.setFooter('Hyper', client.user.avatarURL())
.setTimestamp()
.setThumbnail(client.user.avatarURL())
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ["uyarı-yardım","uyarıyardım","uyarısistemi"], 
  permLevel: 0 
};

exports.help = {
  name: 'uyarı-sistemi',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım'
};