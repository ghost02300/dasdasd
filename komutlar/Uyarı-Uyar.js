const db = require("quick.db");
const Discord = require("discord.js");
exports.run = async (client, message, args) => {

let prefix = await db.fetch(`prefix_${message.guild.id}`);
if (prefix == null) prefix = "d/";

if (db.has(`uyarılog_${message.guild.id}`)) {
  
if (!message.member.hasPermission("ADMINISTRATOR"))
return message.channel.send(
new Discord.MessageEmbed()
.setColor('BLUE')
.setFooter(`Sorgulayan: ${message.author.tag}`,`${message.author.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
.setDescription(`• \`${prefix}uyar\` Kullanabilmek için , \`Yönetici\` **Yetkisine sahip olmanız gerekir**.`));

    let kanal = db.fetch(`uyarılog_${message.guild.id}`)
    let uyarılacak = message.mentions.users.first() //|| args[0] || message.guild.members.cache.get(args[0])
    let sebeb = args.slice(1).join(" ") || "Sebep Yok";
    if (!uyarılacak) {
      message.channel.send(
new Discord.MessageEmbed()
.setColor('BLUE')
.setFooter(`Sorgulayan: ${message.author.tag}`,`${message.author.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
.setDescription(`Uyarmak İstediğin Kişiyi Etiketle \n\nÖrnek: ${prefix}uyar @SoulCastle#0031 Hakaret`));
    } else {
      let uyarısayısı2 = db.fetch(`uyarısayısı_${uyarılacak.id}`);
      
      
db.add(`uyarısayısı_${uyarılacak.id}_${message.guild.id}`, 1);
      
db.add(`sunucutoplamuyarı_${message.guild.id}`, 1);  
      
let toplamuyarı = db.fetch(`uyarısayısı_${uyarılacak.id}_${message.guild.id}`);
if (toplamuyarı == null) toplamuyarı = "0";

let kullanıcı = message.mentions.users.first() || message.guild.members.cache.get(args[0])


let sunucutoplamuyarı = db.fetch(`sunucutoplamuyarı_${message.guild.id}`);
if (sunucutoplamuyarı == null) sunucutoplamuyarı = "0";
      
      const walaska = new Discord.MessageEmbed()
.setThumbnail(uyarılacak.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setColor('BLUE')
.addField(`Hyper Uyarı | Case#${sunucutoplamuyarı}`,`\n> \`Moderatör :\` <@${message.author.id}>  \n> \`Kullanıcı :\` **${uyarılacak.tag}** \n> \`Kullanıcı ID :\` **${uyarılacak.id}** \n> \`Uyarı Sayısı :\` **${toplamuyarı}** \n> \`Sebep :\` \`\`\`${sebeb}\`\`\``, false) //
client.channels.cache.get(kanal).send(walaska); //
     /* if (!uyarısayısı2) {
        db.set(`uyarısayısı_${uyarılacak.id}_${message.guild.id}`, 1);
        return;
      } */

if (toplamuyarı === 1) {
//db.set(`uyarısayısı_${uyarılacak.id}_${message.guild.id}`, 1);
  return;
}

if (toplamuyarı === 2) {
//db.set(`uyarısayısı_${uyarılacak.id}_${message.guild.id}`, 2);
  return;
}


if (toplamuyarı === 3) {
//db.set(`uyarısayısı_${uyarılacak.id}_${message.guild.id}`, 3);
  return;
}


if (toplamuyarı === 4) {
//db.set(`uyarısayısı_${uyarılacak.id}_${message.guild.id}`, 4);
  return;
}

if (toplamuyarı === 5) {
//db.set(`uyarısayısı_${uyarılacak.id}_${message.guild.id}`, 5);
  message.guild.members.ban(uyarılacak, {
  reason: 'Hyper Ban Sistemi'
})
const embed = new Discord.MessageEmbed()
.addField(`Hyper Uyarı | Case#${sunucutoplamuyarı}`,`**<@${uyarılacak.id}> Adlı Kullanıcı** \`5\` **Uyarı Sayısına Ulaştığı İçin Sunucudan __Yasaklanmıştır__!**`, false)
.setFooter(`Yasaklanan : ${uyarılacak.tag}`,`${uyarılacak.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
.setThumbnail(`https://cdn.discordapp.com/emojis/848525147803222059.png?v=1`)
.setColor('BLUE')
client.channels.cache.get(kanal).send(embed)
db.delete(`uyarısayısı_${uyarılacak.id}_${message.guild.id}`);
}
    }
  } else {
    message.channel.send(
new Discord.MessageEmbed()
.setColor('BLUE')
.setFooter(`Sorgulayan: ${message.author.tag}`,`${message.author.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
.setDescription(`**__Uyarı Log__** Kanalı Ayarlı Değil!`));
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['warn','warning','uyarı'],
  permLevel: 0
};

exports.help = {
  name: "uyar",
  description: "",
  usage: "uyar @kişi"
};