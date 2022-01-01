const db = require("quick.db");
const Discord = require("discord.js");
exports.run = async (client, message, args) => {

  let prefix = await db.fetch(`prefix_${message.guild.id}`);
  if (prefix == null) prefix = "d/";
  
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      new Discord.MessageEmbed()
.setColor('BLUE')
.setFooter(`Sorgulayan: ${message.author.tag}`,`${message.author.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
.setDescription(`• \`${prefix}uyarı-sıfırla\` Kullanabilmek için , \`Yönetici\` **Yetkisine sahip olmanız gerekir**.`));

  let sıfırlanacak = message.mentions.users.first();
  if (!sıfırlanacak) {
    message.channel.send(
new Discord.MessageEmbed()
.setColor('BLUE')
.setFooter(`Sorgulayan: ${message.author.tag}`,`${message.author.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
.setDescription(`\`${message.author.tag}\` **Kullanıcı Belirt**`));
  } else {
    db.delete(`uyarısayısı_${sıfırlanacak.id}_${message.guild.id}`);
    message.channel.send(
new Discord.MessageEmbed()
.setColor('BLUE')
.setFooter(`Sıfırlayan: ${message.author.tag}`,`${message.author.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
.setDescription(`
> \`Sıfırlan Kişi :\` **${sıfırlanacak.tag}**
> \`Sıfırlanan Kişi ID'ı :\` **${sıfırlanacak.id}**
`)
)
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['uyarı-sıfırla','u-sıfırala'],
  permLevel: 0
};

exports.help = {
  name: "uyarısıfırla",
  description: "",
  usage: ""
};