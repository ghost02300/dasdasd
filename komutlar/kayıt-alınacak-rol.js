const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require("../ayarlar.json")

exports.run = async(client, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "!";

  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(
    new Discord.MessageEmbed()
  .setTitle("Yetkiniz Yetersiz!")
  .setColor("BLUE")
  .setDescription(`**<a:cikis:848525086184570891> Bu Komudu Kullanabilmen İçin \`Yönetici\` Yetkisine Sahip Olmanız Lazım!**`)
  .setFooter(`${client.user.username} Bot`)
  .setTimestamp()
    )
    
  if (args[0] == 'ayarla') {
    let rol = message.mentions.roles.first();
    if (!rol) return message.channel.send(
      new Discord.MessageEmbed()
  .setTitle("Hatalı Kullanım!")
  .setColor("BLUE")
  .setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
.setTimestamp()
.setDescription(`**__Doğru Kullanımı__ : ${prefix}alınacak-rol ayarla @rol**`)
    )
    db.set(`alınacakrol_${message.guild.id}`, rol.id);
    const embed = new Discord.MessageEmbed()
    .setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
  .setTimestamp()
   .setColor("BLUE")
  .setDescription(`> **Kayıt Sonrası Alınacak Rolü <@&${rol.id}> Olarak Ayarlandı!**
  > **Alınacak Rolü Ayarlayan Yetkili : \`${message.author.username}\`**   
      `);
  message.channel.send(embed);
  }
  if (args[0] == "sıfırla") {
    if (db.has(`alınacakrol_${message.guild.id}`) === false) {
      return message.channel.send(
        new Discord.MessageEmbed()
        .setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
        .setTimestamp()
        .setColor("BLUE")
        .setDescription(`**Kayıt Sonrası Alınacak Rol Zaten Ayarlı Değil**`));
      }
      db.delete(`alınacakrol_${message.guild.id}`);
      const embedi =  new Discord.MessageEmbed()
      .setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
      .setTimestamp()
        .setColor("BLUE")
        .setDescription(`**Kayıt Sonrası Alınacak Rol Sıfırlandı!**`);
        return message.channel.send(embedi)
    }
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: ['alınacakrol', 'arol', 'a-rol'],
  permlevel: 0
}
exports.help = {
  name: 'alınacak-rol',
  description: 'Kayıt Olunca Alınacak Rolü Ayarlar',
  usage: 'alınacak-rol @rol'
}