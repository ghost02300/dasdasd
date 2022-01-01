const db = require("quick.db");
const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
  
  
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "!";
  
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('<a:cikis:848525086184570891> Bu komutu kullanabilmek için **Sunucu Sahibi** olmalısın!')
  
  if (!args[0]) {
    const embed = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
    .setTimestamp()
    .setTitle("Hatalı Kullanım!")
        .setDescription(`<a:cikis:848525086184570891> **__Doğru Kullanımı__ : ${prefix}reklam-engel aç/kapat**`);
    message.channel.send(embed);
    return;
  }
  let reklam = await db.fetch(`reklamengel_${message.guild.id}`);
  if (args[0] == "aç") {
    if (reklam) {
      const embed = new Discord.MessageEmbed()
      .setColor("BLUE")
.setTitle("Hatalı Kullanım!")
.setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
.setTimestamp()
      .setDescription(`<a:cikis:848525086184570891> **Reklam Engel Zaten Aktif!**`);
      message.channel.send(embed);
      return;
    } else {
      db.set(`reklamengel_${message.guild.id}`, "Açık");
      const embed = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
      .setTimestamp()
      .setDescription(`<a:giris:848525087262113802> Reklam Engel **Aktif**!`);

      message.channel.send(embed);
    }
  } else if (args[0] == "kapat") {
    if (db.has(`reklamengel_${message.guild.id}`) === false) {
      return message.channel.send(
        new Discord.MessageEmbed()
        .setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
    .setTimestamp()
    .setTitle("Hatalı Kullanım!")
        .setColor("BLUE")
        .setDescription(`**Reklam Engel Zaten Kapalı**`));
      }
    db.delete(`reklamengel_${message.guild.id}`);
    const embed = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
    .setTimestamp()
    .setDescription(`<a:giris:848525087262113802> Reklam Engel **Deaktif**!`);

    message.channel.send(embed);
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "reklam-engel",
  description: "",
  usage: "küfür-engel"
};
