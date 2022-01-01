const Discord = require('discord.js');
const db = require('croxydb');
const database = require('quick.db');
exports.run = async(client, message, args) => { 
  let prefix = (await database.fetch(`prefix_${message.guild.id}`)) || "!";
const embed = new Discord.MessageEmbed()
.setColor('BLUE')
.setTitle('<a:mavihype:848529559518314537> Kayıt Yardım Komutları')
.setTimestamp()
.addField(`<a:mavihype:848529559518314537> ${prefix}alınacak-rol `, `Kayıt Sonrası Alınacak Rolü Ayarlarsınız`)
.addField(`<a:mavihype:848529559518314537> ${prefix}kayıt-yetkili `, `Yetkili Rolü Ayarlarsınız`)
.addField(`<a:mavihype:848529559518314537> ${prefix}kayıt-log`, `Log Kanalı Ayarlarsınız`)
.addField(`<a:mavihype:848529559518314537> ${prefix}kayıt-hg`, `Hoşgeldin Kanalı Ayarlarsınız`)
.addField(`<a:mavihype:848529559518314537> ${prefix}kayıt-stats`, `Stats Sayısını Gösterir`)
.addField(`<a:mavihype:848529559518314537> ${prefix}kayıt-ayarlar`, `Yapılanlar Ayarları Gösterir`)
.addField(`<a:mavihype:848529559518314537> ${prefix}kız-rol`, `Kız Rolü Ayarlarsınız`)
.addField(`<a:mavihype:848529559518314537> ${prefix}erkek-rol`, `Erkek Rolü Ayarlarsınız`)
.addField(`<a:mavihype:848529559518314537> ${prefix}üye-rol`, `Üye Rolü Ayarlarsınız`)
.addField(`<a:mavihype:848529559518314537> ${prefix}kayıt-sıfırla`, `Stats Sayısı Sıfırlarsınız`)
.addField(`<a:mavihype:848529559518314537> ${prefix}erkek`, `Erkek Üyeleri Kayıt Etmeye Yarar`)
.addField(`<a:mavihype:848529559518314537> ${prefix}üye`, `Üyeleri Kayıt Etmeye Yarar`)
.addField(`<a:mavihype:848529559518314537> ${prefix}kız`, `Kız Üyeleri Kayıt Etmeye Yarar`)
.addField(`» Hyper Bot Bağlantıları`, `[Bot Davet Linki](https://discord.com/oauth2/authorize?client_id=826542677981134859&scope=bot&permissions=8) **|** [Destek Sunucusu](https://discord.gg/4jydw2xdQQ) **|** [Oy Linki](https://botsfordiscord.com/bot/826542677981134859/vote) **|**`)
.setFooter('Hyper', client.user.avatarURL())
.setTimestamp()
.setThumbnail(client.user.avatarURL())
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ["kayıt-yardım","kayıtyardım","kayıtsistemi"], 
  permLevel: 0 
};

exports.help = {
  name: 'kayıt-sistemi',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım'
};