const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');
const ms = require('quick-ms')
exports.run = async(client, message, args) => {

  if (!db.has(`premod_${message.guild.id}`) == true) {
    
    const westrabumbeyyy = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription("**<a:cikis:848525086184570891> Bu sunucuda `Premium Mod Aktif Değil` Bu yüzden bu komutu kullanamazsınız.**")
    return message.channel.send(westrabumbeyyy)

  
} else {

let saat = 43200000 //12 saat girdim ben. Milisaniye cinsinden istediğiniz süreyi girebilirsiniz.
let süre = db.fetch(`csunucutanıt_${message.guild.id}`)

if(süre !== null && saat - (Date.now() - süre) > 0) {

let c = ms(saat - (Date.now() - süre))
const emmbed1 = new Discord.MessageEmbed()
.setColor("RED")
.setDescription(`<a:cikis:848525086184570891> Sunucunu zaten tanıtmışsın! Lütfen **${c.hours}** saat **${c.minutes}** dakika bekle.`)
message.channel.send(emmbed1)   
} else {
  
  const emmbed3 = new Discord.MessageEmbed()
.setColor("RED")
.setDescription(`<a:cikis:848525086184570891> Bu komutu kullanabilmek için **Yönetici** yetkisine sahip olmalısın!`)
 if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(emmbed3) 


message.channel.createInvite({maxAge: 0}).then(i => {

let embed = new Discord.MessageEmbed()
.setFooter(`Hyper Sunucu Tanıt Sistemi`)
.setThumbnail(message.guild.iconURL({dynamic:true}))
.setColor("RANDOM")
.setDescription(`**${message.guild.name}** sunucusu tanıtıldı! Bilgiler

**Kurucu:** \`${message.guild.owner.user.tag}\`
**Sunucu Adı:** \`${message.guild.name}\`
**Kullanıcı Sayısı:** \`${message.guild.memberCount}\`
**Sunucu linki:** https://discord.gg/${i.code}
`)
db.set(`csunucutanıt_${message.guild.id}`, Date.now())
client.channels.cache.get("858280517852987412").send(embed)
const emmbed2 = new Discord.MessageEmbed()
.setColor("RANDOM")
.setDescription(`<a:giris:848525087262113802> Sunucun başarıyla [burada](https://discord.gg/4jydw2xdQQ) tanıtıldı! 12 saat sonra tekrar tanıtabilirsin.`)
message.channel.send(emmbed2)  
})  
}
}
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["sunucutanit", "Sunucutanit", "sunucu-tanıt", "sunucu-tanit"],
    permLevel: 0
  };
  
  exports.help = {
    name: 'sunucutanıt',
    description: 'Türkiyenin Saatini Gösterir',
    usage: 'gç'
  };
 