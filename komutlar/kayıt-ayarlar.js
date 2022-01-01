const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args, member) => {

//____________________________________________________________________________________________\\
let prefix = await db.fetch(`prefix_${message.guild.id}`) || "!";
//____________________________________________________________________________________________\\

//____________________________________________________________________________________________\\
let alınacakrol = await db.fetch(`alınacakrol_${message.guild.id}`);
//____________________________________________________________________________________________\\

//____________________________________________________________________________________________\\
let üyerol = await db.fetch(`Üyerol_${message.guild.id}`);
//____________________________________________________________________________________________\\

//____________________________________________________________________________________________\\
  let erkekrol = await db.fetch(`erkekrol_${message.guild.id}`);
//____________________________________________________________________________________________\\

//____________________________________________________________________________________________\\
let kızrol = await db.fetch(`kızrol_${message.guild.id}`);
//____________________________________________________________________________________________\\

//____________________________________________________________________________________________\\
let kayıtlog = await db.fetch(`kayıtkanal_${message.guild.id}`);
//____________________________________________________________________________________________\\

//____________________________________________________________________________________________\\
let kayıtyetkili = await db.fetch(`kayıtçırol_${message.guild.id}`);
//____________________________________________________________________________________________\\

let guild = message.guild;
const ayarlar = new Discord.MessageEmbed()
.setColor("BLUE")
.setTimestamp()
.setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
.setAuthor(`${guild.name} Sunucu Ayarları`, message.guild.iconURL({ dynamic: true, format: "png", size: 1024 }))
.addField(`Alınacak Rol`,`${alınacakrol ? `<:on:848526464881655828> <@&${alınacakrol}>` : "<:off:848526234253918279> \`Pasif\`"}`, false)
.addField(`Kayıt Yetkili Rol`,`${kayıtyetkili ? `<:on:848526464881655828> <@&${kayıtyetkili}>` : "<:off:848526234253918279> \`Pasif\`"}`, false)
.addField(`Erkek Rol`,`${erkekrol ? `<:on:848526464881655828> <@&${erkekrol}>` : "<:off:848526234253918279> \`Pasif\`"}`, false)
.addField(`Kız Rol`,`${kızrol ? `<:on:848526464881655828> <@&${kızrol}>` : "<:off:848526234253918279> \`Pasif\`"}`, false)
.addField(`Üye Rol`,`${üyerol ? `<:on:848526464881655828> <@&${üyerol}>` : "<:off:848526234253918279> \`Pasif\`"}`, false)
.addField(`Kayıt Kanal`,`${kayıtlog ? `<:on:848526464881655828> <#${kayıtlog}>` : "<:off:848526234253918279> \`Pasif\`"}`, false)
message.channel.send(ayarlar);                             
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  kategori: "kayıtayarlar",
  permLevel: 0
};

exports.help = {
  name: "kayıt-ayarlar",
  description: "Bot İçin Sunucuyu Ayarlarını Gösterir.",
  usage: "ayarlar"
};
