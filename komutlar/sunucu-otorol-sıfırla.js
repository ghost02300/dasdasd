const Discord = require("discord.js");
const db = require("quick.db");
exports.run = async (client, message, args) => {
  
  let prefix = await db.fetch(`prefix_${message.guild.id}`);
  if (prefix == null) prefix = "d/";
  

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_ROLES")) {
    const embed = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setFooter(client.user.username, client.user.avatarURL())
    .setDescription(`<a:cikis:848525086184570891> ${prefix}oto-rol-kapat Kullanabilmek için , \`Rolleri Yönet\` **Yetkisine sahip olmanız gerekir**.`);
    message.channel.send(embed);
    return;
  }
const sistem = await db.fetch(`otorolrol_${message.guild.id}`);
if(!sistem) return message.channel.send(
  new Discord.MessageEmbed()
  .setColor("BLUE")
  .setFooter(client.user.username, client.user.avatarURL())
  .setDescription(`<a:cikis:848525086184570891> **Oto-Rol Sistemi Aktif Olmadığı __Kapatılamadı__**`));
//return message.channel.send(
db.delete(`otorolrol_${message.guild.id}`);
db.delete(`otorolkanal_${message.guild.id}`);
//return message.channel.send(
const embedi =  new Discord.MessageEmbed()

.setColor("BLUE")
.setFooter(client.user.username, client.user.avatarURL())
.setDescription(`<a:giris:848525087262113802> **Oto-Rol Sistemi Başarıyla __Kapatıldı__**`);
  return message.channel.send(embedi);
}
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["oto-rol-kapat"],
  permLevel: 0
};

exports.help = {
  name: "otorol-kapat",
  description: "",
  usage: "otorol-kapat"
};