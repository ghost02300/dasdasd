const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args) => {

  if (!db.has(`premod_${message.guild.id}`) == true) {
    
    const westrabumbeyyy = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription("**<a:cikis:848525086184570891> Bu sunucuda `Premium Mod Aktif Değil` Bu yüzden bu komutu kullanamazsınız. __Premium Hakkında Bilgi Almak Tıkla__ : [↗️](https://discord.gg/Y5xKvZAnKj)**")
    return message.channel.send(westrabumbeyyy)

  
} else {

if (message.author.id !== message.guild.ownerID)
    return message.channel.send("Bu Komutu Sadece Sunucu Sahibi Kullanabilir!");

let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(rol => rol.name === args[0]);
if (!rol) {
return message.channel.send(`\`${message.author.tag}\`, **Verilecek Rolü __Etiketleyin__ veya __ID__ Giriniz !**`)
}

let üyesayı = message.guild.memberCount;
let botsayı = message.guild.members.cache.filter(m => m.user.bot).size || 'Yok'
let toplamüye = üyesayı - botsayı || 'Yok'

const walaska = new Discord.MessageEmbed()
.setColor(rol.hexColor)
.setTitle(`İşlem Sonucu`)
.setFooter(`Faktörleştiren : ${message.author.tag}`,`${message.author.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
.addField(`__Rol Hakkında__`,`\`Rol :\` <@&${rol.id}> (${rol.name}) \n\`Rol ID :\` ${rol.id}`, false)
.addField(`__Verilme Hakkında__`,`\`Üye Sayısı :\` ${toplamüye || 'Yok'} \n\`Bot Sayısı :\` ${botsayı || 'Yok'}`, false) 
message.guild.members.cache.forEach(member => { member.roles.add(rol) })
message.channel.send(walaska)

}
};
exports.conf = {
enabled: true,
guildOnly: false,
aliases: ['herkesten-rol-ver','trv'],
permLevel: 0
}
exports.help = {
name: 'toplu-rol-ver',
description: 'Toplu Olarak Rolleri Üyelere Verir.',
usage: '!toplu-rol-ver <@rol>'
}
