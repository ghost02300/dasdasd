const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {

let kanal = db.fetch(`kayıtkanal_${message.guild.id}`)
let alınacakrol = db.fetch(`alınacakrol_${message.guild.id}`)
let kızrol = db.fetch(`kızrol_${message.guild.id}`)
let kayıtçı = (await db.fetch(`kayıtçırol_${message.guild.id}`));
const kızkayıt = await db.fetch(`kızkayıt_${message.author.id}.${message.guild.id}`)
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
if (!kızrol) return message.channel.send(
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
member.roles.add(kızrol) 

const başarılı = new Discord.MessageEmbed() 
.setTitle(`Kayıt İşlemi Tamamlandı!`)
.setColor('BLUE')
.setDescription(`**<:user_woman:862071173944836136> Kız Olarak Kayıt Edilen Kullanıcı: ${member} \n <:Settings:862390608651223051> Kayıt Eden Yetkili: <@!${message.author.id}> \n **`)
.addField(`**Kullanıcının ismi :**`, `${isim}`, true)
.addField(`**Kullanıcının Yaşı :**`, `${yaş}`, true)
.setThumbnail(message.mentions.users.first().avatarURL({dynamic: true}))
.setFooter(`${message.author.username} Adlı Yetkilinin Kayıt Sayısı : ${kızkayıt ? kızkayıt : '0'}`, message.author.avatarURL())
message.channel.send(başarılı)
db.add(`kızkayıt_${message.author.id}.${message.guild.id}`, 1)
db.add(`toplamkayıt_${message.author.id}.${message.guild.id}`, 1)
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: ['k'],
  permlevel: 0
}
exports.help = {
  name: 'kız',
  description: 'kız olarak kayıt eder',
  usage: '!kız @kullanıcı isim yaş'
}