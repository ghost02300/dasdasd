const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {

let kanal = db.fetch(`kayıtkanal_${message.guild.id}`)
let alınacakrol = db.fetch(`alınacakrol_${message.guild.id}`)
let erkekrol = db.fetch(`erkekrol_${message.guild.id}`)
let kayıtçı = db.fetch(`kayıtçırol_${message.guild.id}`)
const kayıtsayı = await db.fetch(`erkekrol_${message.author.id}.${message.guild.id}`)
if(!message.member.roles.cache.has(kayıtçı)) return message.channel.send(
  new Discord.MessageEmbed()
.setTitle("Yetkiniz Yetersiz!")
.setColor("BLUE")
.setDescription(`**<a:cikis:848525086184570891> Bu Komudu Kullanabilmen İçin ${kayıtçı ? `<@&${kayıtçı}>` : "\`Rol Ayarlanmamış\`"} Adlı Role Sahip olman Lazım !**`)
.setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
.setTimestamp()
  )
if(message.channel.id !== kanal) return message.channel.send(
  new Discord.MessageEmbed()
  .setTitle("Hatalı Kanal!")
  .setColor("BLUE")
  .setDescription(`**<a:cikis:848525086184570891> Bu Komudu Sadece <#${kanal}> Adlı Kanalda Kullanabilirsin !**`)
  .setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
  .setTimestamp()
)
if (!erkekrol) return message.channel.send(
  new Discord.MessageEmbed()
  .setTitle("Atanmamış Rol!")
  .setColor("BLUE")
  .setDescription(`**<a:cikis:848525086184570891> Sunucuda Kız Rolü Ayarlanmadığı İçin Komut Kullanılamaz !**`)
  .setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
  .setTimestamp()
)
let member = message.mentions.members.first();
if (!member) return message.channel.send(
  new Discord.MessageEmbed()
  .setTitle("Hatalı Kullanım!")
  .setColor("BLUE")
  .setDescription(`**<a:cikis:848525086184570891> Kız Olarak Kayıt Edeceğin Kullanıcıyı Belirtmelisin !**`)
  .setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
  .setTimestamp()
  )
let isim = args[1]
if (!isim) return message.channel.send(
  new Discord.MessageEmbed()
  .setTitle("Hatalı Kullanım!")
  .setColor("BLUE")
  .setDescription(`**<a:cikis:848525086184570891> İsmini Belirtmelisin !**`)
  .setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
  .setTimestamp()
  )
let yaş = args[2]
if (!yaş) return message.channel.send(
  new Discord.MessageEmbed()
  .setTitle("Hatalı Kullanım!")
  .setColor("BLUE")
  .setDescription(`**<a:cikis:848525086184570891> Yaşını Belirtmelisin !**`)
  .setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
  .setTimestamp()
  )
member.setNickname(`${isim} | ${yaş}`)
member.roles.remove(alınacakrol)
member.roles.add(erkekrol) 

const başarılı = new Discord.MessageEmbed() 
.setTitle(`Kayıt İşlemi Tamamlandı!`)
.setColor('BLUE')
.setDescription(`**<:user_man:862071104289112084> Erkek Olarak Kayıt Edilen Kullanıcı: ${member} \n <:Settings:862390608651223051> Kayıt Eden Yetkili: <@!${message.author.id}> \n **`)
.addField(`**Kullanıcının ismi :**`, `${isim}`, true)
.addField(`**Kullanıcının Yaşı :**`, `${yaş}`, true)
.setThumbnail(message.mentions.users.first().avatarURL({dynamic: true}))
.setFooter(`${message.author.username} Adlı Yetkilinin Kayıt Sayısı : ${kayıtsayı ? kayıtsayı : '0'}`, message.author.avatarURL())
message.channel.send(başarılı)
db.add(`kayıtsayı_${message.author.id}.${message.guild.id}`, 1)
db.add(`toplamkayıt.${message.guild.id}.${message.author.id}`, 1)
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: ['e'],
  permlevel: 0
}
exports.help = {
  name: 'erkek',
  description: 'erkek olarak kayıt eder',
  usage: 'dr!erkek @kullanıcı isim yaş'
}