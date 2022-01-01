const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async function(client, message, args) {
   
let prefix = await db.fetch(`prefix_${message.guild.id}`) || "!";

  if (!message.member.hasPermission("BAN_MEMBERS")) 
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("BLUE")
        .setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
        .setTimestamp()
        .setDescription(
          `• \`${prefix}ban \`Kullanabilmek için , \`Üyeleri Engelle\` **Yetkisine sahip olmanız gerekir**.`
        )
    );
  
let member = message.mentions.users.first() || args[0] || message.guild.members.cache.get(args[0])
const user = message.guild.member(member);

let user2;
if(member instanceof Discord.GuildMember) { user2 = member.user; }
else if(member instanceof Discord.User) { user2 = member; }
else { user2 = await client.users.fetch(member) };

if (!user) return message.reply(
message.channel.send(
new Discord.MessageEmbed()
.setColor("BLUE")
.setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
.setTimestamp()
.setDescription(`**Belirli Bir** \`Kullanıcı\` veya \`ID\` **__Giriniz__** !`)));

if (isNaN(member)) return message.reply(
new Discord.MessageEmbed()
.setColor("BLUE")
.setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
.setTimestamp()
.setDescription(`**Belirli Bir** \`Kullanıcı\` veya \`ID\` **__Giriniz__** !`));

let sebep = args.splice(1).join(' ') || 'Sebep Belirtilmedi'

message.guild.members.ban(member, {
  reason: sebep
})
  
message.channel.send(
new Discord.MessageEmbed()
.setColor("BLUE")
.setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
.setTimestamp()
.setDescription(`${user2.tag} İD'li Kullanıcı **${sebep || 'Sebep Belirtilmedi'}** Nedeniyle Ban Atıldı!`)
);

db.add(`banlananlar_${client.id}`, 1)
  
};
module.exports.conf = {
  aliases: [],
  permLevel: 0,
  enabled: true,
  guildOnly: true,
};
 
module.exports.help = {
  name: "ban",
  description: "kick",
  usage: "ban"
};