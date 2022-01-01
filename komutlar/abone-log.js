const db = require("croxydb")
const Discord = require("discord.js")
const ayarlar = require("../ayarlar.json")


exports.run = async(client, message, args) => {
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || `${ayarlar.prefix}`;
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(
  
    new Discord.MessageEmbed()
    .setTitle("Yetersiz Yetki!")
    .setColor("BLUE")
    .setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
    .setTimestamp()
    .setDescription("<a:cikis:848525086184570891> bu özelliği kullanabilmek için `Yönetici` yetkisine sahip olmalısınız")
      )
      if (args[0] == 'ayarla') {
        let abonelog = message.mentions.channels.first()
      if(!abonelog) return message.channel.send(
        new Discord.MessageEmbed()
        .setTitle("Hatalı Kullanım!")
        .setColor("BLUE")
        .setFooter(`${client.user.username} Bot`)
        .setTimestamp()
        .setDescription(`**Hatalı Kullanım! Doğru Kullanım : ${prefix}abone-log ayarla #kanal**`)
        )
         
        db.set(`abonelog_${message.guild.id}`, abonelog.id)
          message.channel.send(
            new Discord.MessageEmbed()
            .setTitle("Abone Log Ayarlandı!")
            .setDescription(`> **Abone Log ${abonelog} Olarak Ayarlanmıştır**
            > 
            > **Abone Logu Ayarlayan Yetkili :** \`${message.author.username}\``)
            .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
            .setColor("BLUE")
            .setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
              )
        }
        if (args[0] == 'sıfırla') {
          db.delete(`abonelog_${message.guild.id}`)
          message.channel.send(
            new Discord.MessageEmbed()
            .setTitle("Abone Log Sıfırlandı!")
            .setDescription(`> **Abone Log Sıfırlanmıştır!**
            > 
            > **Abone Log Sıfırlayan Yetkili :** \`${message.author.username}\``)
            .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
            .setColor("BLUE")
            .setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
          )
        }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['abone-log'],
  permLevel: 0,
 };
 
 exports.help = {
  name: 'abonelog',
  description: 'kayıt Olunca Verilecek rolü ayarlarsınız',
  usage: 'kayıt-rol <@rol>'
 };