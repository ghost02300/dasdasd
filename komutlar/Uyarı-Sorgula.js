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
.setDescription(`• \`${prefix}uyarı-sorgula\` Kullanabilmek için , \`Yönetici\` **Yetkisine sahip olmanız gerekir**.`));
  
   let uyarılacak = message.mentions.users.first()
  
if(!uyarılacak) return message.channel.send(
  new Discord.MessageEmbed()
.setColor('BLUE')
.setFooter(`Sorgulayan: ${message.author.tag}`,`${message.author.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
.setDescription(`\`${message.author.tag}\` **Kullanıcı Belirt**`))

  let toplamuyarı = db.fetch(`uyarısayısı_${uyarılacak.id}_${message.guild.id}`);
if (toplamuyarı == null) toplamuyarı = "0";
  
  const sorgu = new Discord.MessageEmbed() 
  .setColor('BLUE')
  .setFooter(`İstiyen: ${message.author.tag}`,`${message.author.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
  .setThumbnail(uyarılacak.avatarURL({ dynamic: true, format: "png", size: 1024 }))
  .setDescription(`
> \`Sorgulanan Kişi :\` **${uyarılacak.tag}**
> \`Sorgulanan Kişi ID :\` **${uyarılacak.id}**
> \`Toplam Uyarı Sayısı :\` **${toplamuyarı}**`); 
  message.channel.send(sorgu);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['uyarısorgula'],
  permLevel: 0
};
exports.help = {
  name: "uyarı-sorgula",
  description: "",
  usage: ""
};
