const Discord = require('discord.js');
const database = require('quick.db');
exports.run = async(client, message, args) => { 
  let prefix = (await database.fetch(`prefix_${message.guild.id}`)) || "!";
const embed = new Discord.MessageEmbed()
.setColor('BLUE')
.setTitle('<a:mavihype:848529559518314537> Abone Yardım Komutları')
.addField(`<a:mavihype:848529559518314537> ${prefix}abone-rol ayarla`, `Abone Rolü Ayarlarsınız`)
.addField(`<a:mavihype:848529559518314537> ${prefix}abone-yetkili ayarla`, `Yetkili Rolü Ayarlarsınız`)
.addField(`<a:mavihype:848529559518314537> ${prefix}abone`, `Rol verirsiniz`)
.addField(`<a:mavihype:848529559518314537> ${prefix}abone-stats`, `Etiketlediğiniz kişinin veya kendinizin istatistiklerine bakarsınız.`)
.addField(`<a:mavihype:848529559518314537> ${prefix}abone-sıfırlama`, `Stats Sayısı Sıfırlarsınız.`)
.addField(`<a:mavihype:848529559518314537> ${prefix}abone-sistemi`, `Abone sistemi Açılmadan Çalışmaz.`)
.addField(`<a:mavihype:848529559518314537> ${prefix}abone-ayarlar`, `Abone Ayarlarını Gösterir.`)
.addField(`» Hyper Bot Bağlantıları`, `[Bot Davet Linki](https://discord.com/oauth2/authorize?client_id=826542677981134859&scope=bot&permissions=8) **|** [Destek Sunucusu](https://discord.gg/4jydw2xdQQ) **|** [Oy Linki](https://botsfordiscord.com/bot/826542677981134859/vote) **|**`)
.setFooter(`${client.user.username} Bot`, client.user.avatarURL())
.setTimestamp()
.setThumbnail(client.user.avatarURL())
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ["abone-yardım","aboneyardım","abonesistemi"], 
  permLevel: 0 
};

exports.help = {
  name: 'yardım-abone',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım'
};