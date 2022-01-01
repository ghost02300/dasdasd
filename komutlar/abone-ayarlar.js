const Discord = require("discord.js");
const db = require("croxydb");
exports.run = async (client, message, args, member) => {

//____________________________________________________________________________________________\\
let abonerol = await db.fetch(`abonerol_${message.guild.id}`);
//____________________________________________________________________________________________\\

//____________________________________________________________________________________________\\
  let aboneyetkilisi = await db.fetch(`aboneyetkilirol_${message.guild.id}`);
//____________________________________________________________________________________________\\



let guild = message.guild;
const ayarlar = new Discord.MessageEmbed()
.setColor("BLUE")
.setTimestamp()
.setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
.setAuthor(`${guild.name} Sunucu Ayarları`, message.guild.iconURL({ dynamic: true, format: "png", size: 1024 }))
.addField(`Abone Yetkili Rol`,`${aboneyetkilisi ? `<:on:848526464881655828> <@&${aboneyetkilisi}>` : "<:off:848526234253918279> \`Pasif\`"}`, false)
.addField(`Abone Rol`,`${abonerol ? `<:on:848526464881655828> <@&${abonerol}>` : "<:off:848526234253918279> \`Pasif\`"}`, false)
message.channel.send(ayarlar);                             
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  kategori: "aboneayarlar",
  permLevel: 0
};

exports.help = {
  name: "abone-ayarlar",
  description: "",
  usage: "ayarlar"
};
