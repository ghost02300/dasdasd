const Discord = require('discord.js');
const db = require('croxydb');

exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('<a:cikis:848525086184570891> bu özelliği kullanabilmek için `Yönetici` yetkisine sahip olmalısınız')
  if (args[0] == 'ayarla') {
  let abonerol = message.mentions.roles.first()
  if (!abonerol) return message.channel.send('<a:cikis:848525086184570891> Lütfen Abone rolünü etiketlermisin?')
   
  db.set(`abonerol_${message.guild.id}`, abonerol.id)
    message.channel.send(
      new Discord.MessageEmbed()
      .setTitle("Abone Yetkilisi Tanımlandı!")
      .setDescription(`> **Abone Rolü ${abonerol} Olarak Tanımlanmıştır**
      > 
      > **Abone Rolü Tanımlayan Yetkili :** \`${message.author.username}\``)
      .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      .setColor("BLUE")
      .setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
      .setTimestamp()
        )
  }
  if (args[0] == 'sıfırla') {
    db.delete(`abonerol_${message.guild.id}`)
    message.channel.send(
      new Discord.MessageEmbed()
      .setTitle("Abone Yetkilisi Tanımlandı!")
      .setDescription(`> **Abone Rolü Sıfırlanmıştır!**
      > 
      > **Abone Rolünü Sıfırlayan Yetkili :** \`${message.author.username}\``)
      .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
      .setColor("BLUE")
      .setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
      .setTimestamp()
    )
  }
  
 };

exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['abonerol'],
 permLevel: 0,
};

exports.help = {
 name: 'abone-rol',
 description: 'kayıt Olunca Verilecek rolü ayarlarsınız',
 usage: 'kayıt-rol <@rol>'
};