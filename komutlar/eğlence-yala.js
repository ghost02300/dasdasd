const Discord = require('discord.js');
const funnyWords = require("funny-words");

exports.run = async (client, message, args) => {
if(!message.mentions.members.first()) return message.channel.send(new Discord.MessageEmbed().setColor('BLUE').setDescription(`Kullanıcı Etiketlemeye Ne Dersin?`)).then(a => a.delete({timeout: 10000}))
var gifler = [
  "https://cdn.discordapp.com/attachments/796110689831223326/798300872538849290/lick3.gif",
  "https://cdn.discordapp.com/attachments/796110689831223326/798300881283842089/lick5.gif",
  "https://cdn.discordapp.com/attachments/796110689831223326/798300890820902932/lick2.gif",
  "https://cdn.discordapp.com/attachments/796110689831223326/798300893804101642/lick6.gif",
  "https://cdn.discordapp.com/attachments/796110689831223326/798300898136686622/lick4.gif",
  "https://cdn.discordapp.com/attachments/796110689831223326/798300898790998066/lick1.gif",
  "https://cdn.discordapp.com/attachments/796110689831223326/798300902846890084/lick7.gif"
];
let lick = gifler[Math.floor(Math.random() * gifler.length)];
if(message.author.id === message.mentions.members.first().id) return message.channel.send(new Discord.MessageEmbed().setColor('#00567e').setTitle('Dur Orda!').setDescription('Kendini yalayamazsın olum sakin.')).then(a => a.delete({timeout: 10000}))
message.channel.send(
new Discord.MessageEmbed()
.setColor("BLUE")
.setDescription(`> ${message.author} ${message.mentions.members.first()} **Kişisini Yaladı.**`)
.setImage(lick)
)
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["yala"],
  permLevel: 0
};
exports.help = {
  name: "lick",
  description: "abone-ayarlar.",
  usage: "abone-ayarlar"
};