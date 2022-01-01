const Discord = require('discord.js');
const funnyWords = require("funny-words");

exports.run = async (client, message, args) => {
if(!message.mentions.members.first()) return message.channel.send(new Discord.MessageEmbed().setColor('BLUE').setDescription(`Kullanıcı Etiketlemeye Ne Dersin?`)).then(a => a.delete({timeout: 10000}))
var gifler = [
  "https://media.giphy.com/media/3bqtLDeiDtwhq/giphy.gif",
  "https://media.giphy.com/media/ZQN9jsRWp1M76/giphy.gif",
  "https://media.giphy.com/media/JUwliZWcyDmTQZ7m9L/giphy.gif",
  "https://media.giphy.com/media/C4gbG94zAjyYE/giphy.gif",
  "https://media.giphy.com/media/l2QDM9Jnim1YVILXa/giphy.gif",
  "https://media.giphy.com/media/sUIZWMnfd4Mb6/giphy.gif",
  "https://media.giphy.com/media/nUz7d1sUppGta/giphy.gif",
  "https://media.giphy.com/media/aD1fI3UUWC4/giphy.gif",
  "https://media.giphy.com/media/EGauSkKQZuXxS/giphy.gif",
  "https://media.giphy.com/media/rSNAVVANV5XhK/giphy.gif",
  "https://media.giphy.com/media/BXrwTdoho6hkQ/giphy.gif",
  "https://media.giphy.com/media/od5H3PmEG5EVq/giphy.gif",
  "https://media.giphy.com/media/yziFo5qYAOgY8/giphy.gif",
  "https://media.giphy.com/media/DjczAlIcyK1Co/giphy.gif",
  "https://media.giphy.com/media/PHZ7v9tfQu0o0/giphy.gif",
  "https://media.giphy.com/media/1434tCcpb5B7EI/giphy.gif",
  "https://media.giphy.com/media/9haQXx4YgpmqA/giphy.gif"
];
let hug = gifler[Math.floor(Math.random() * gifler.length)];
if(message.author.id === message.mentions.members.first().id) return message.channel.send(new Discord.MessageEmbed().setColor('#9c5cb2').setTitle('Agaa beeeeeeeee!').setDescription('')).then(a => a.delete({timeout: 10000}))
message.channel.send(
new Discord.MessageEmbed()
.setColor("BLUE")
.setDescription(`> ${message.author} ${message.mentions.members.first()} **Kişisine Sarıldı.**`)
.setImage(hug)
)
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sarıl"],
  permLevel: 0
};
exports.help = {
  name: "hug",
  description: "",
  usage: ""
};