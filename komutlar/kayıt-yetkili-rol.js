const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "!";
  
if(args[0] === "sıfırla") {
  if (db.has(`kayıtçırol_${message.guild.id}`) === false) {
    return message.channel.send( 
      new discord.MessageEmbed()
.setTitle("Hatalı Kullanım!")
.setDescription(`**Kayıt Yetkili Rolü Zaten Ayarlı Değil!**`)
.setColor("BLUE")
.setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
.setTimestamp()
    )
  }
db.delete(`kayıtçırol_${message.guild.id}`)
return message.channel.send(
  new discord.MessageEmbed()
.setTitle("Kayıt Yetkili Rolü Sıfırlandı!")
.setDescription(`> **Kayıt Yetkili Rolü Sıfırlandı!**
> 
> **Kayıt Yetkili Rolünü Sıfırlayan Yetkili :** \`${message.author.username}\``)
.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
.setColor("BLUE")
.setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
.setTimestamp()
)
}
if(args[0] === "ayarla") {
let rol = message.mentions.roles.first();   
if (!rol) {
  return message.channel.send(
    new discord.MessageEmbed()
.setTitle("Hatalı Kullanım!")
.setColor("BLUE")
.setDescription(`<a:cikis:848525086184570891> **Doğru Kullanımı : ${prefix}kayıt-yetkili ayarla #rol**`)
.setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
.setTimestamp() 
)
}
db.set(`kayıtçırol_${message.guild.id}`, rol.id)
return message.channel.send(
  new discord.MessageEmbed()
.setTitle("Kayıt Yetkili Rolü Ayarlandı!")
.setColor('BLUE')
.setDescription(`> <a:giris:848525087262113802> **Kayıt Yetkili Rolü ${rol} Olarak Ayarlandı!** 
> 
> **Kayıt Yetkili Rolü Ayarlayan Yetkili :** \`${message.author.username}\``)
.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
.setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
.setTimestamp()
)
}
  
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: ['k-yetkili', 'kayıty','kayıt-yetkilisi'],
  permlevel: 0
}
exports.help = {
  name: 'kayıt-yetkili',
  description: 'kız rolünü ayarlar',
  usage: 'dr!kız-rol @rol'
}