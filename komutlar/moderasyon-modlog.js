const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "!";
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`<a:cikis:848525086184570891> Bu komutu kullanabilmek için "\`yönetici\`" yetkisine sahip olmalısın`);

if(args[0] === "sıfırla") {
  if (db.has(`log_${message.guild.id}`) === false) {
    return message.channel.send( 
      new discord.MessageEmbed()
.setTitle("Hatalı Kullanım!")
.setDescription(`**ModLog Zaten Ayarlı Değil!**`)
.setColor("BLUE")
.setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
.setTimestamp()
    )
  }
db.delete(`log_${message.guild.id}`)
return message.channel.send(
  new discord.MessageEmbed()
.setTitle("ModLog Sıfırlanmıştır!")
.setDescription(`> **ModLog Sıfırlandı!**
> 
> **ModLog Sıfırlayan Yetkili :** \`${message.author.username}\``)
.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
.setColor("BLUE")
.setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
.setTimestamp()
)
}
if(args[0] === "ayarla") {
let kanal = message.mentions.channel.first();   
if (!kanal) {
  return message.channel.send(
    new discord.MessageEmbed()
.setTitle("Hatalı Kullanım!")
.setColor("BLUE")
.setDescription(`<a:cikis:848525086184570891> **Doğru Kullanımı : ${prefix}modlog ayarla #kanal**`)
.setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
.setTimestamp() 
)
}
db.set(`log_${message.guild.id}`, log.id)
return message.channel.send(
  new discord.MessageEmbed()
.setTitle("ModLog Kanalı Ayarlandı!")
.setColor('BLUE')
.setDescription(`> <a:giris:848525087262113802> **ModLog ${kanal} Olarak Ayarlandı!** 
> 
> **ModLog Kanalı Ayarlayan Yetkili :** \`${message.author.username}\``)
.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
.setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
.setTimestamp()
)
}
  
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: ['mod-log', 'log'],
  permlevel: 0
}
exports.help = {
  name: 'modlog',
  description: 'kız rolünü ayarlar',
  usage: 'dr!kız-rol @rol'
}