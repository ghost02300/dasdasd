const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");


exports.run = async (client, message, args) => {
  
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "!";
  
  if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send('<a:cikis:848525086184570891> bu özelliği kullanabilmek için `Sunucuyu Yönet` iznine sahip olmalısınız')
  if (args[0] == 'ayarla') {
  let rol = message.mentions.roles.first();
  let kanal = message.mentions.channels.first();

  if (!rol) {
    const embed2 = new Discord.MessageEmbed()
    .setFooter(`${client.user.username} Bot`,`${client.user.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
  .setTitle("Hatalı Kullanım!")
      .setDescription(`**Doğru Kullanım : ${prefix}bot-rol ayarla @rol #kanal**`)
      .setColor("BLUE");

    return message.channel.send(embed2);
  }

  if (!kanal) {
    const embed3 = new Discord.MessageEmbed()
    .setFooter(`${client.user.username} Bot`,`${client.user.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
    .setTimestamp()
  .setTitle("Hatalı Kullanım!")
      .setDescription(`**Doğru Kullanım : ${prefix}bot-rol ayarla @rol #kanal**`)
      .setColor("BLUE");

    return message.channel.send(embed3);
  } 

  db.set(`otobotrol_${message.guild.id}`, rol.id);
  db.set(`otobotkanal_${message.guild.id}`, kanal.id);

  const embed = new Discord.MessageEmbed()
  .setFooter(`${client.user.username} Bot`,`${client.user.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
  .setTimestamp()
   .setColor("BLUE")
  .setDescription(
      `**Bot Oto Rolü <@&${rol.id}> Olarak, Bildirimin Gideceği Kanal İse <#${kanal.id}> Olarak Ayarlandı** \n\`Not\`: **Botun \`@${client.user.username}\` Rolünü En Üstte Olmaz İse Rol __Vermez__**`
    );
  message.channel.send(embed);
  }
  
  if (args[0] == "sıfırla") {
    if (db.has(`otobotrol_${message.guild.id}`) === false) {
    return message.channel.send(
      new Discord.MessageEmbed()
      .setFooter(`${client.user.username} Bot`,`${client.user.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
      .setTimestamp()
      .setColor("BLUE")
      .setDescription(`**Oto-Rol Bot Sistemi Aktif Değil**`));
    }
    db.delete(`otobotrol_${message.guild.id}`);
    db.delete(`otobotkanal_${message.guild.id}`);
    const embedi =  new Discord.MessageEmbed()
    .setFooter(`${client.user.username} Bot`,`${client.user.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
    .setTimestamp()
      .setColor("GREEN")
      .setDescription(`**Oto-Rol Bot Sistemi Başarıyla Kapatıldı!**`);
      return message.channel.send(embedi)
  }
  }
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["bot-rol"],
  permLevel: 0
};

exports.help = {
  name: "botrol-aç",
  description: "",
  usage: "otorol"
};