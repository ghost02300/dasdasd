const Discord = require("discord.js");
const db = require("quick.db");
const soulcastle = require("../ayarlar.json")
exports.run = async(client, message, args) => {
  
  let prefix = await db.fetch(`prefix.${message.guild.id}`) || soulcastle.prefix 

if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('<a:cikis:848525086184570891> bu özelliği kullanabilmek için `Sunucuyu Yönet` iznine sahip olmalısınız')

if (!args[0])
    return message.channel.send(
      new Discord.MessageEmbed()
.setColor('BLUE')
.setFooter(`${client.user.username} Bot`,`${client.user.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
.setTimestamp()
.setTitle("Hatalı Kullanım!")
.setDescription(`**<a:cikis:848525086184570891> **__Doğru Kullanımı__ :  ${prefix}bot-koruma aç/kapat**`)
    );

  if (args[0] == "aç") {
    if (db.has(`botkoruma_${message.guild.id}`) === true) {
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor('BLUE')
          .setFooter(`${client.user.username} Bot`,`${client.user.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
          .setTimestamp()
          .setTitle("Hatalı Kullanım!")
          .setDescription(`**<a:cikis:848525086184570891> __Bot Koruma Sistemi__ Zaten Açık!**`)
      );
    }
    db.set(`botkoruma_${message.guild.id}`, "bot-koruma aç");
    message.cahnnel.send(
      new Discord.MessageEmbed()
        .setColor('BLUE')
        .setFooter(`Açan : ${message.author.tag}`,`${message.author.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
        .setDescription(`**<a:giris:848525087262113802> __Bot Koruma Sistemi __ Başarıyla Açıldı!**`)
    );
  }

  if (args[0] == "kapat") {
    if (db.has(`botkoruma_${message.guild.id}`) === false) {
      return message.channel.send(
        new Discord.MessageEmbed()
           .setColor('BLUE')
           .setFooter(`${client.user.username} Bot`,`${client.user.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
           .setTimestamp()
           .setTitle("Hatalı Kullanım!")
           .setDescription(`**<a:cikis:848525086184570891> Bot Koruma Sistemi Zaten Kapalı!**`)
      );
    }
    db.delete(`botkoruma_${message.guild.id}`, "bot-koruma aç");
    message.channel.send(
      new Discord.MessageEmbed()
        .setColor('BLUE')
        .setFooter(`Sonlandıran : ${message.author.tag}`,`${message.author.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
        .setDescription(`**<a:giris:848525087262113802> Bot Koruma Sistemi Başarıyla __Kapatıldı!__**`)
    );
  }
  
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["botk"],
  permLevel: 0
};

exports.help = {
  name: 'bot-koruma',
  description: 'Mod-Log kanalını belirler.',
  usage: 'mod-log <#kanal>'
};