const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  
  let prefix = await db.fetch(`prefix_${message.guild.id}`);
  if (prefix == null) prefix = "d/";
  
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      new Discord.MessageEmbed()
.setColor('BLUE')
.setFooter(`Sorgulayan: ${message.author.tag}`,`${message.author.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
.setDescription(`• \`${prefix}uyarı-log\` Kullanabilmek için , \`Yönetici\` **Yetkisine sahip olmanız gerekir**.`));
  
  let logk = message.mentions.channels.first();
  let logkanal = await db.fetch(`uyarılog_${message.guild.id}`);

  if (args[0] === "sıfırla" || args[0] === "kapat") {
    if (!logkanal)
      return message.channel.send(
        new Discord.MessageEmbed()
      .setColor('BLUE')
.setFooter(`Sorgulayan: ${message.author.tag}`,`${message.author.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
.setDescription(`**__Uyarı Log Kanalı__ Zaten Ayarlı Değil! **`));
    db.delete(`uyarılog_${message.guild.id}`);
    message.channel.send(
     new Discord.MessageEmbed()
.setColor('BLUE')
.setFooter(`Sonlandıran: ${message.author.tag}`,`${message.author.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
.setDescription(`**__Uyarı Log Kanalı__ Başarıyla Sıfırlandı**`));
    return;
  }
  if (!logk)
    return message.channel.send(
      new Discord.MessageEmbed()
    .setColor('BLUE')
.setFooter(`Sorgulayan: ${message.author.tag}`,`${message.author.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
.setDescription(`**Belirli Bir __Kanal Etiketleyiniz__!**`));

  db.set(`uyarılog_${message.guild.id}`, logk.id);

  message.channel.send(
    new Discord.MessageEmbed()
    .setColor('BLUE')
.setFooter(`Ayarlayan: ${message.author.tag}`,`${message.author.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
.setDescription(`**__Uyarı Log Kanalı__ Başarıyla** ${logk} **Kanalı Olarak Ayarlandı!**`));
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['uyarı-log','uyarılog'],
  permLevel: 0
};
exports.help = {
  name: "uyarı-log-ayarla",
  description: "Uyarı Log Kanalı Ayarlarsınız",
  usage: "d/uyar @Kullanıcı"
};