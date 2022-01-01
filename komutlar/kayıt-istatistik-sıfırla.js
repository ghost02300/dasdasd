const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');
exports.run = (client, message, args) => {

  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(
    new Discord.MessageEmbed()
  .setTitle("Yetkiniz Yetersiz!")
  .setColor("BLUE")
  .setDescription(`**<a:cikis:848525086184570891> Bu Komudu Kullanabilmen İçin \`Yönetici\` Yetkisine Sahip Olmanız Lazım!**`)
  .setFooter(`${client.user.username} Bot`)
  .setTimestamp()
    )
   let user = message.mentions.users.first();
   if (message.mentions.users.size < 1) return message.reply('<a:cikis:848525086184570891> Lütfen Kayıt İstatistiğini Sileceğin Kişiyi Etiketle!');
     if (db.has(`kayıtsayı_${user.id}`) === false) return message.reply("<a:cikis:848525086184570891> Zaten 0 Görünüyor!")
     if (db.has(`kızkayıt_${user.id}`) === false) return message.reply("<a:cikis:848525086184570891> Zaten 0 Görünüyor!")
     if (db.has(`toplamkayıt_${user.id}`) === false) return message.reply("<a:cikis:848525086184570891> Zaten 0 Görünüyor!")

     if(args[0] === "sıfırla") {
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
            db.delete(`kayıtsayı_${user.id}`)
            db.delete(`kızkayıt_${user.id}`)
            db.delete(`toplamkayıt_${user.id}`)
          })
      }) }

}; 


exports.conf = { 
enabled: true,
guildOnly: false,
 aliases: ['kayıti'], 
permLevel: 0
}

exports.help = {
 name: 'kayıt-istatistik', 
description: 'kayıt sistemini kapatır',
 usage: 'kayıt-kapat' 
};
