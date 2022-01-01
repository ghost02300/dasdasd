const Discord = require('discord.js');
const funnyWords = require("funny-words");

exports.run = async (client, message, args) => {
if(!message.mentions.members.first()) return message.channel.send(new Discord.MessageEmbed().setColor('BLUE').setDescription(`Kullanıcı Etiketlemeye Ne Dersin?`)).then(a => a.delete({timeout: 10000}))
var gifler = [
  "https://media.giphy.com/media/zkppEMFvRX5FC/giphy.gif",
  "https://media.giphy.com/media/bGm9FuBCGg4SY/giphy.gif",
  "https://media.giphy.com/media/bm2O3nXTcKJeU/giphy.gif",
  "https://media.giphy.com/media/MXAPA2JH9GS4g/giphy.gif",
  "https://media.giphy.com/media/vUrwEOLtBUnJe/giphy.gif",
  "https://media.giphy.com/media/HdDIQPqGyFvsA/giphy.gif",
  "https://media.giphy.com/media/MQVpBqASxSlFu/giphy.gif",
  "https://media.giphy.com/media/G3va31oEEnIkM/giphy.gif",
  "https://media.giphy.com/media/w9xag7QUzLgLC/giphy.gif",
  "https://media.giphy.com/media/WynnqxhdFEPYY/giphy.gif",
  "https://media.giphy.com/media/H8XZI3PJm258c/giphy.gif",
  "https://media.giphy.com/media/rU7RhIQuwGWOc/giphy.gif",
  "https://media.giphy.com/media/KmeIYo9IGBoGY/giphy.gif",
  "https://media.giphy.com/media/flmwfIpFVrSKI/giphy.gif",
  "https://media.giphy.com/media/JFmIDQodMScJW/giphy.gif",
  "https://media.giphy.com/media/hnNyVPIXgLdle/giphy.gif",
  "https://media.giphy.com/media/kU586ictpGb0Q/giphy.gif",
  "https://media.giphy.com/media/8iwfa0XSxDUSQ/giphy.gif",
  "https://media.giphy.com/media/l4FsKa1n9fyStiwZW/giphy.gif",
  "https://media.giphy.com/media/EVODaJHSXZGta/giphy.gif"
];
let kiss = gifler[Math.floor(Math.random() * gifler.length)];
if(message.author.id === message.mentions.members.first().id) return message.channel.send(new Discord.MessageEmbed().setColor('BLUE').setTitle('Bunu Gizlice Yapmaya Ne dersin!')).then(a => a.delete({timeout: 10000}))
message.channel.send(
new Discord.MessageEmbed()
.setColor("BLUE")
.setDescription(`> ${message.author} ${message.mentions.members.first()} **kişisini öptü.**`)
.setImage(kiss)


)
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["öp"],
  permLevel: 0
};
exports.help = {
  name: "kiss",
  description: "",
  usage: ""
};