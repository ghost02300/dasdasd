const discord = require('discord.js');
const db = require('quick.db')


exports.run = async (client, message,args) => {
  
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(
    new Discord.MessageEmbed()
  .setTitle("Yetkiniz Yetersiz!")
  .setColor("BLUE")
  .setDescription(`**<a:cikis:848525086184570891> Bu Komudu Kullanabilmen İçin \`Yönetici\` Yetkisine Sahip Olmanız Lazım!**`)
  .setFooter(`${client.user.username} Bot`)
  .setTimestamp()
    )
    

if(args[0] === "sıfırla") {

  if (db.has(`güvenlik_${message.guild.id}`) === false) {
    return message.channel.send( 
      new discord.MessageEmbed()
.setTitle("Hatalı Kullanım!")
.setDescription(`**Resimli Güvenlik Zaten Ayarlı Değil!**`)
.setColor("BLUE")
.setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
.setTimestamp()
    )
  }
db.delete(`güvenlik_${message.guild.id}`)
return message.channel.send(
  new discord.MessageEmbed()
.setTitle("Resimli Güvenlik Sıfırlandı!")
.setDescription(`> **Resimli Güvenlik Sıfırlandı!**
> 
> **Resimli Güvenlik Sıfırlayan Yetkili :** \`${message.author.username}\``)
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
.setDescription(`<a:cikis:848525086184570891> **Doğru Kullanımı : ${prefix}güvenlik ayarla #kanal**`)
.setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
.setTimestamp() 
)
}
db.set(`güvenlik_${message.guild.id}`, kanal.id)
return message.channel.send(
  new discord.MessageEmbed()
.setTitle("Resimli Güvenlik Ayarlandı!")
.setColor('BLUE')
.setDescription(`> <a:giris:848525087262113802> **Resimli Güvenlik Log Kanalı ${kanal} Olarak Ayarlandı!** 
> 
> **Resimli Güvenlik Ayarlayan Yetkili :** \`${message.author.username}\``)
.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
.setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
.setTimestamp()
)
}
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
};

exports.help = {
    name: 'güvenlik',
    description: '',
    usage: ''
};