const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");


exports.run = async (client, message, args,) => {
//____________________________________________________________________________________________\\
let prefix = await db.fetch(`prefix_${message.guild.id}`) || "!"; //Prefix Kısmı
//____________________________________________________________________________________________\\
if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(
  new Discord.MessageEmbed()
.setTitle("Yetkiniz Yetersiz!")
.setColor("BLUE")
.setDescription(`**<a:cikis:848525086184570891> Bu Komudu Kullanabilmen İçin \`Yönetici\` Yetkisine Sahip Olmanız Lazım!**`)
.setFooter(`${client.user.username} Bot`)
.setTimestamp()
  )

if (args[0] == "kapat" || "sıfırla") {
  if (db.has(`ototag_${message.guild.id}` || `ototagkanal_${message.guild.id}`) === false) {
    return message.channel.send( 
      new Discord.MessageEmbed()
.setTitle("Hatalı Kullanım!")
.setDescription(`**Kayıt Kanalı Zaten Ayarlı Değil!**`)
.setColor("BLUE")
.setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
.setTimestamp()
    )
  }
db.delete(`ototag_${message.guild.id}` || `ototagkanal_${message.guild.id}`)
return message.channel.send(
  new Discord.MessageEmbed()
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
if (args[0] == "ayarla" || "aç") {
  let Kanal = message.mentions.channels.first()
  let tag = args.slice(1).join(' ')
  if(!Kanal || !tag) return message.reply(`Ototag sistemini ayarlamak için **kanal ve tag** belirtmelisin.`)
    
  db.set(`ototag_${message.guild.id}`,tag) 
  db.set(`ototagkanal_${message.guild.id}`,Kanal.id)
  message.channel.send(`Ototag aktif edildi!\nYeni gelen kullanıcılara **${tag}** Tagını vereceğim.`)
}
};  
exports.conf = {
  enabled: false, 
  guildOnly: false, 
  aliases: ["oto-tag"], 
  permLevel: 0 
};
exports.help = {
  name: 'ototag',
  description: 'Ototag Sistemi',
  usage: 'ototag kanal tag'
};