const db = require("quick.db");
const Discord = require("discord.js");
exports.run = async(client, message, args) => {

let toplamuyarı = await db.fetch(`uyarısayısı_${message.author.id}_${message.guild.id}`);
if (toplamuyarı == null) toplamuyarı = "0";

const sorgu = new Discord.MessageEmbed() 
.setColor('BLUE')
.setFooter(`İstiyen: ${message.author.tag}`,`${message.author.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
.setThumbnail(message.author.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setDescription(`
> \`Bilgilerin :\` **${message.author.tag}**
> \`ID'ın :\` **${message.author.id}**
> \`Toplam Uyarı Sayın :\` **${toplamuyarı}**`); 
  message.channel.send(sorgu);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['uyarım'],
  permLevel: 0
};

exports.help = {
  name: "uyarılarım",
  description: "",
  usage: ""
};