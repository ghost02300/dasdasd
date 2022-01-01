const Discord = require('discord.js');
const db = require('croxydb');

exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('<a:cikis:848525086184570891> bu özelliği kullanabilmek için `Yönetici` yetkisine sahip olmalısınız')
  if (args[0] == 'ayarla') {
  
  let aboneyetkilirol = message.mentions.roles.first()
  if (!aboneyetkilirol) return message.channel.send('<a:cikis:848525086184570891> Lütfen Abone rolünü etiketlermisin?')
  
  db.set(`aboneyetkilirol_${message.guild.id}`, aboneyetkilirol.id)
  message.channel.send(
new Discord.MessageEmbed()
.setTitle("Abone Yetkilisi Tanımlandı!")
.setDescription(`> **Abone Yetkili Rolü ${aboneyetkilirol} Olarak Tanımlanmıştır**
> 
> **Abone Yetkili Rolü Tanımlayan Yetkili :** \`${message.author.username}\``)
.setThumbnail(message.author.displayAvatarURL({dynamic: true}))
.setColor("BLUE")
.setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
.setTimestamp()

  )
} 
  

  if (args[0] == 'sıfırla') {
    db.delete(`aboneyetkilirol_${message.guild.id}`)
    message.channel.send(
      new Discord.MessageEmbed()
    .setTitle("Abone Yetkilisi Tanımlandı!")
    .setDescription(`> **Abone Yetkili Rolü Sıfırlanmıştır!**
    > 
    > **Abone Yetkili Rolünü Sıfırlayan Yetkili :** \`${message.author.username}\``)
    .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
    .setColor("BLUE")
    .setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
    .setTimestamp())
  }

}
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ['aboneyrol','abone-y-rol'],
 permLevel: 0,
};

exports.help = {
 name: 'abone-yetkili',
 description: '',
 usage: ''
};