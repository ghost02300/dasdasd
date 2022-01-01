const Discord = require('discord.js');
const db = require('croxydb');
const database = require('quick.db');
exports.run = async(client, message, args) => { 
  let prefix = (await database.fetch(`prefix_${message.guild.id}`)) || "!";
const embed = new Discord.MessageEmbed()
.setColor('BLUE')
.setTitle('<a:mavihype:848529559518314537> Kullanıcı Komutları')
.setTimestamp()
.addField(`<a:mavihype:848529559518314537> ${prefix}kullanıcı-bilgi `, `Kullanıcının Bilgilerini Gösterir`)
.addField(`<a:mavihype:848529559518314537> ${prefix}sunucu-bilgi `, `sunucunun Bilgilerini Gösterir`)
.addField(`<a:mavihype:848529559518314537> ${prefix}avatar `, `Profil Fotoğrafını Atar`)
.addField(`<a:mavihype:848529559518314537> ${prefix}emoji-bilgi `, `Emoji Hakkında Bilgi Verir`)
.addField(`<a:mavihype:848529559518314537> ${prefix}emoji-ekle `, `Sunucuya Emoji Eklemenize Yarar`)
.addField(`» Hyper Bot Bağlantıları`, `[Bot Davet Linki](https://discord.com/oauth2/authorize?client_id=826542677981134859&scope=bot&permissions=8) **|** [Destek Sunucusu](https://discord.gg/4jydw2xdQQ) **|** [Oy Linki](https://botsfordiscord.com/bot/826542677981134859/vote) **|**`)
.setFooter('Hyper', client.user.avatarURL())
.setTimestamp()
.setThumbnail(client.user.avatarURL())
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ["kullanıcı-yardım","kullanıcıyardım","kullanıcısistemi"], 
  permLevel: 0 
};

exports.help = {
  name: 'kullanıcı',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım'
};