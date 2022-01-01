const Discord = require('discord.js');
const db = require('quick.db')
exports.run = async (client, message, args) => { 
const fynx = require("../ayarlar.json");
let prefix = await db.fetch(`prefix.${message.guild.id}`) || fynx.prefix   
let kanal = message.mentions.channels.first() 
let sayı = args[1]
let kalan = args[1] - message.guild.memberCount
if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`<a:mavihype:848529559518314537> **Bu komutu kullanabilmek için** "\`Yönetici\`" **yetkisine sahip olmalısın.**`);
 
 if(!kanal) return message.channel.send(`<a:mavihype:848529559518314537> **Lütfen Bir Kanal Belirt!** \n**__Örnek Kullanım__** : \`${prefix}sayaç-ayarla #kanal <Sayı>\``)
  
 if(isNaN(args[1])) return message.channel.send(`<a:mavihype:848529559518314537> **Belirttiğin Sayı Çok Küçük Veya O Sayıya Zaten Ulaşmışsın!**\n**__Örnek Kullanım__** : \`${prefix}sayaç-ayarla #kanal <Sayı>\``)
 
 if(message.guild.memberCount > args[1]) return message.channel.send(`<a:mavihype:848529559518314537> **Belirttiğin Sayı Çok Küçük Veya O Sayıya Zaten Ulaşmışsın!**\n**__Örnek Kullanım__** : \`${prefix}sayaç-ayarla #kanal <Sayı>\``)

 
  message.channel.send(`╔▬▬▬▬▬▬▬▬ Hyper Sayaç ▬▬▬▬▬▬▬▬▬
║► <a:mavihype:848529559518314537> Sayaç Aktif Edildi.
║► <a:mavihype:848529559518314537> **${args[1]}** Olarak Güncelledim! 
║► <a:mavihype:848529559518314537> Kayıt Kanalını **${kanal}** Olarak Güncelledim! 
║► <a:mavihype:848529559518314537> ${args[1]} Kişi Olmaya Son :fire: **${kalan}** :fire: Kişi Kaldı!
╚▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)

  
  db.set(`sayacK_${message.guild.id}`, kanal.id)  
  db.set(`sayacS_${message.guild.id}`, sayı) 
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["sayaçayarla"],
    permLevel: 0
  };
  
  exports.help = {
    name: 'sayaç-ayarla',
    description: '',
    usage: ''
  };

