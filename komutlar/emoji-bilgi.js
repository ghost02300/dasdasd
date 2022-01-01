const {Discord ,MessageEmbed} = require("discord.js");
const db = require("quick.db");
const moment = require("moment");
const ayarlar = require("../ayarlar.json");
require('moment-duration-format')
exports.run = async function(client, message, args) {
  let emojiName = args[0];
  var anan;
  if (!emojiName)
    return message.reply(
      new MessageEmbed()
      .setColor("BLUE")
      .setDescription("Lütfen Sadece Belirli Bir Emoji İsmi Giriniz").then(a => a.delete({ timeout: 10000 })));
  const emoji = message.guild.emojis.cache.find(a => a.name == emojiName);
  if (!emoji)
    return message.channel.send(`<@${message.author.id}> Sunucunuzda **${emojiName}** İsimli Emoji Bulunmamakta veya __Emoji İsmi__ Girmediniz!`);
  if (emoji.animated) anan = `\`<a:${emoji.name}:${emoji.id}>\``;
  if (emoji.animated == false) anan = `\`<:${emoji.name}:${emoji.id}>\``;

let gecen = new Date().getTime() - emoji.createdAt.getTime()
let haha = moment.duration(gecen).format('D [Gün, ] h [Saat, ] m [Dakika,] s [Saniye Önce]')


let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author
const emojisahibi = await emoji.fetchAuthor();
  const codeuniverse = new MessageEmbed()
     .setColor("BLUE")
     .setFooter(`Sorgulayan: ${message.author.tag}`,`${user.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
     .addField("Emojinin Adı",`${emoji} ${emoji.name}`, true)
     .addField("Emojinin IDI",`${emoji.id}`, true)
     .addField("Kodu:",`${anan}`, false)
     .addField("Emoji Oluşturma Tarihi:",`${haha}`, false)
     .addField("Emoji İndirme Linki:",`[İndir](https://cdn.discordapp.com/emojis/${emoji.id}.png)`, true)
     .addField(`Emoji Sahibi:`,`${emojisahibi.tag}`, true)
     .setThumbnail(message.guild.iconURL({ dynamic: true, format: "png", size: 1024 }))
     .setImage(`${emoji.url}`);
  message.channel.send(codeuniverse)
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["emoji-bilgi"],
    permLevel: 0
  };
  
  exports.help = {
    name: 'emojibilgi',
    description: '',
    usage: ''
  };