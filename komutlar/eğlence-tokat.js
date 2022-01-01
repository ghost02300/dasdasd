const Discord = require('discord.js');
const funnyWords = require("funny-words");

exports.run = async (client, message, args) => {
if(!message.mentions.members.first()) return message.channel.send(new Discord.MessageEmbed().setColor('BLUE').setDescription(`Kullanıcı Etiketlemeye Ne Dersin?`)).then(a => a.delete({timeout: 10000}))
var gifler = [
  "https://media.giphy.com/media/Gf3AUz3eBNbTW/giphy.gif",
  "https://media.giphy.com/media/Ur8qw9UJEhNuw/giphy.gif",
  "https://media.giphy.com/media/uqSU9IEYEKAbS/giphy.gif",
  "https://media.giphy.com/media/uqSU9IEYEKAbS/giphy.gif",
  "https://media.giphy.com/media/uqSU9IEYEKAbS/giphy.gif",
  "https://media.giphy.com/media/xUNd9HZq1itMkiK652/giphy.gif",
  "https://media.giphy.com/media/iMCedi21L9MXg1gN43/giphy.gif",
  "https://media.giphy.com/media/6Fad0loHc6Cbe/giphy.gif",
  "https://media.giphy.com/media/YVPh1GYFqJt6/giphy.gif"
];
let slap = gifler[Math.floor(Math.random() * gifler.length)];
if(message.author.id === message.mentions.members.first().id) return message.channel.send(new Discord.MessageEmbed().setColor('#00567e').setTitle('Dur Orda!').setDescription('Kendini tokat atıcaksın olum sakin.')).then(a => a.delete({timeout: 10000}))
message.channel.send(
new Discord.MessageEmbed()
.setColor("BLUE")
.setDescription(`> ${message.author} ${message.mentions.members.first()} **Kişisiniz Tokatladı.**`)
.setImage(slap)


)
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["tokat"],
  permLevel: 0
};
exports.help = {
  name: "slap",
  description: "",
  usage: ""
};