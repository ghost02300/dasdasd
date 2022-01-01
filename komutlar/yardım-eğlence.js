const Discord = require('discord.js');
const db = require('croxydb');
const database = require('quick.db');
exports.run = async(client, message, args) => { 
  let prefix = (await database.fetch(`prefix_${message.guild.id}`)) || "!";
const embed = new Discord.MessageEmbed()
.setColor('BLUE')
.setTitle('<a:mavihype:848529559518314537> Kayıt Yardım Komutları')
.setTimestamp()
.addField(`<a:mavihype:848529559518314537> ${prefix}kiss `, `Etiketlediğiniz Kişiyi Öpersiniz`)
.addField(`<a:mavihype:848529559518314537> ${prefix}hug `, `Etiketlediğiniz Kişiye Sarılırsınız`)
.addField(`<a:mavihype:848529559518314537> ${prefix}slap`, `Etiketlediğiniz Kişiye Tokat Atarsınız`)
.addField(`<a:mavihype:848529559518314537> ${prefix}lick`, `Etiketlediğiniz Kişiyi Yalarsınız`)
.addField(`<a:mavihype:848529559518314537> ${prefix}sor`, `Soru Sorarınız`)
.addField(`<a:mavihype:848529559518314537> ${prefix}aşk-ölçer`, `aşk ölçer(Resimli gecikme olabilir)`)
.addField(`<a:mavihype:848529559518314537> ${prefix}drake`, `Drake Memes Yaparsınız`)
.addField(`<a:mavihype:848529559518314537> ${prefix}change-my-mind`, `Change My Mind Memes Yaparsınız`)
.addField(`<a:mavihype:848529559518314537> ${prefix}wanted`, `Profil Fotoğrafınıza Wanted Efekti Ekler`)
.addField(`» Hyper Bot Bağlantıları`, `[Bot Davet Linki](https://discord.com/oauth2/authorize?client_id=826542677981134859&scope=bot&permissions=8) **|** [Destek Sunucusu](https://discord.gg/4jydw2xdQQ) **|** [Oy Linki](https://botsfordiscord.com/bot/826542677981134859/vote) **|**`)
.setFooter('Hyper', client.user.avatarURL())
.setTimestamp()
.setThumbnail(client.user.avatarURL())
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: [], 
  permLevel: 0 
};

exports.help = {
  name: 'eğlence',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım'
};