const Discord = require('discord.js');
const db = require('croxydb');
const ayarlar = require('../ayarlar.json');
exports.run = (client, message, args) => {

if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('<a:cikis:848525086184570891> bu özelliği kullanabilmek için `Yönetici` yetkisine sahip olmalısınız')
   let user = message.mentions.users.first();
   if (message.mentions.users.size < 1) return message.reply('<a:cikis:848525086184570891> Lütfen Abone Rol Verme Sayısını Sileceğin Kişiyi Etiketle!');
     if (db.has(`aboneistatistik_${user.id}`) === false) return message.channel.send("<a:cikis:848525086184570891> Zaten 0 Görünüyor!")


     message.channel.send(
new Discord.MessageEmbed()
.setColor("BLUE")
.setTimestamp()
.setTitle("Abone İstatistik Sıfırlama")
.setDescription(`**<@${user.id}> Kişinin İstatistikleri Sıfırlansın mı?**`)
.setFooter(`${client.user.username} Bot`)
.setThumbnail(client.user.displayAvatarURL({dynamic: true}))
     ).then(sunucu => {
    sunucu.react("✅")

    let cso = (reaction, user) =>
      reaction.emoji.name === "✅" && user.id === message.author.id;
    let csv = sunucu.createReactionCollector(cso, { time: 0 });
    csv.on("collect", async r => {
     
      message.channel.send(
      new Discord.MessageEmbed()
      .setColor("BLUE")
.setTimestamp()
.setTitle("Abone İstatistik Sıfırlama")
.setDescription(`**<@${user.id}> Adlı Kişinin İstatistikleri Sıfırlandı!**`)
.setFooter(`${client.user.username} Bot`)
.setThumbnail(message.mentions.users.first().avatarURL({dynamic: true}))

      ).then(cs => cs.delete({ timeout: 5000 }));
db.delete(`aboneistatistik_${user.id}`)
    })
}) 
}

exports.conf = { 
enabled: true,
guildOnly: false,
 aliases: ['asayısıfırla','abonesayısıfırla'], 
permLevel: 0
}

exports.help = {
 name: 'abone-sıfırlama', 
description: 'kayıt sistemini kapatır',
 usage: 'kayıt-kapat' 
};