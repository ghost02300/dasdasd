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
return message.channel.send(`\`${message.author.tag}\`, **Alınacak Rolü __Etiketleyin__ veya __ID__ Giriniz !**`)
}

let rolekullanıcı = rol.members.size
let rolebot = message.guild.members.cache.filter(a => a.roles.cache.has(rol.id) && a.user.bot).size || 'Yok'
let rolekişi = rolekullanıcı - rolebot || 'Yok'

const walaska = new Discord.MessageEmbed()
.setColor(rol.hexColor)
.setTitle(`İşlem Sonucu`)
.setFooter(`Faktörleştiren : ${message.author.tag}`,`${message.author.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
.addField(`__Rol Hakkında__`,`\`Rol :\` <@&${rol.id}> (${rol.name}) \n\`Rol ID :\` ${rol.id}`, false)
.addField(`__Alınma Hakkında__`,`\`Üye Sayısı :\` ${rolekişi || 'Yok'} \n\`Bot Sayısı :\` ${rolebot || 'Yok'}`, false) 
message.guild.members.cache.forEach(member => { member.roles.remove(rol) })
message.channel.send(walaska)

    }
};
exports.conf = {
enabled: true,
guildOnly: false,
aliases: ['herkesten-rol-al','tra'],
permLevel: 0
}
exports.help = {
name: 'toplu-rol-al',
description: 'Toplu Olarak Rolleri Üyelerden Alır.',
usage: '!toplu-rol-al <@rol>'
}