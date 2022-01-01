const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  
  let channel = message.mentions.channels.first();
  if (!channel) {
    const hgbb2 = new Discord.MessageEmbed()
     .setTitle('Hyper Bot | Resimli HG-BB Sistemi')
  .setFooter(`Hyper Bot | ${message.author.username} komutu kullandı.`)
    .setColor("BLUE")
    .setDescription('**Bir kanal etiketleyin.**')
    return message.reply(hgbb2);
  }
  db.set(`gçkanal_${message.guild.id}`, channel.id);
  const hgbb1 = new Discord.MessageEmbed()
   .setTitle('Hyper Bot | Resimli HG-BB Sistemi')
  .setFooter(`Hyper Bot | ${message.author.username} komutu kullandı.`)
  .setColor("BLUE")
  .setDescription(` Resimli HG-BB Kanalı ${channel} Olarak Ayarlandı. `)
  message.channel.send(hgbb1);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["hgbb-ayarla"],
  permLevel: 0
};

exports.help = {
  name: "giriş-çıkış-ayarla",
  description: "",
  usage: ""
};