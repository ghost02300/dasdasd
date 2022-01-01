const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "!";
    
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(
    new Discord.MessageEmbed()
  .setTitle("Yetkiniz Yetersiz!")
  .setColor("BLUE")
  .setDescription(`**<a:cikis:848525086184570891> Bu Komudu Kullanabilmen İçin \`Yönetici\` Yetkisine Sahip Olmanız Lazım!**`)
  .setFooter(`${client.user.username} Bot`)
  .setTimestamp()
    )

if(args[0] === "sıfırla") {
  if (db.has(`kayıtkanal_${message.guild.id}`) === false) {
    return message.channel.send( 
      new discord.MessageEmbed()
.setTitle("Hatalı Kullanım!")
.setDescription(`**Kayıt Kanalı Zaten Ayarlı Değil!**`)
.setColor("BLUE")
.setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
.setTimestamp()
    )
  }
db.delete(`kayıtkanal_${message.guild.id}`)
return message.channel.send(
  new discord.MessageEmbed()
.setTitle("Kayıt Kanalı Sıfırlandı!")
.setDescription(`> **Kayıt Kanalı Sıfırlandı!**
> 
> **Kayıt Kanalını Sıfırlayan Yetkili :** \`${message.author.username}\``)
.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
.setColor("BLUE")
.setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
.setTimestamp()
)
}
if(args[0] === "ayarla") {
let kanal = message.mentions.channels.first();   
if (!kanal) {
  return message.channel.send(
    new discord.MessageEmbed()
.setTitle("Hatalı Kullanım!")
.setColor("BLUE")
.setDescription(`<a:cikis:848525086184570891> **Doğru Kullanımı : ${prefix}kayıt-Kanal ayarla #kanal**`)
.setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
.setTimestamp() 
)
}
db.set(`kayıtkanal_${message.guild.id}`, kanal.id)
return message.channel.send(
  new discord.MessageEmbed()
.setTitle("Kayıt Kanalı Ayarlandı!")
.setColor('BLUE')
.setDescription(`> <a:giris:848525087262113802> **Kayıt Kanalı ${kanal} Olarak Ayarlandı!** 
> 
> **Kayıt Kanalını Ayarlayan Yetkili :** \`${message.author.username}\``)
.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
.setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
.setTimestamp()
)
}
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: ['kayıtkanal', 'kkanal', 'k-kanal'],
  permlevel: 0
}
exports.help = {
  name: 'kayıt-kanal',
  description: 'Kayıt Olunacak Kanalı Ayarlar',
  usage: 'dr!kayıt-kanal #kanal'
}