const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {

  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "!";

  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`<a:cikis:848525086184570891> Bu komutu kullanabilmek için "\`yönetici\`" yetkisine sahip olmalısın`);

  if (args[0] == 'erkek') {
    let rol = message.mentions.roles.first();
    if (!rol) return message.channel.send(
      new Discord.MessageEmbed()
  .setTitle("Hatalı Kullanım!")
  .setColor("BLUE")
  .setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
.setTimestamp()
.setDescription(`**__Doğru Kullanımı__ : ${prefix}erkek-rol ayarla @rol**`)
    )
    db.set(`erkekrol_${message.guild.id}`, rol.id);
    const embed = new Discord.MessageEmbed()
    .setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
  .setTimestamp()
   .setColor("BLUE")
  .setDescription(`> **Erkek Rolü <@&${rol.id}> Olarak Ayarlandı!**
  > **Erkek Rolünü Ayarlayan Yetkili : \`${message.author.username}\`**   
      `);
  message.channel.send(embed);
  }
  if (args[0] == 'kız') {
    let rol = message.mentions.roles.first();
    if (!rol) return message.channel.send(
      new Discord.MessageEmbed()
  .setTitle("Hatalı Kullanım!")
  .setColor("BLUE")
  .setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
.setTimestamp()
.setDescription(`**__Doğru Kullanımı__ : ${prefix}kız-rol ayarla @rol**`)
    )
    db.set(`kızrol_${message.guild.id}`, rol.id);
    const embed = new Discord.MessageEmbed()
    .setTitle("Kız Rolü Ayarlanmıştır")
    .setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
  .setTimestamp()
   .setColor("BLUE")
  .setDescription(`> **Kız Rolü <@&${rol.id}> Olarak Ayarlandı!**
  > **Kız Rolünü Ayarlayan Yetkili : \`${message.author.username}\`**   
      `);
  message.channel.send(embed);
  }
  if (args[0] == 'üye') {
    let rol = message.mentions.roles.first();
    if (!rol) return message.channel.send(
      new Discord.MessageEmbed()
  .setTitle("Hatalı Kullanım!")
  .setColor("BLUE")
  .setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
.setTimestamp()
.setDescription(`**__Doğru Kullanımı__ : ${prefix}erkek-rol ayarla @rol**`)
    )
    db.set(`Üyerol_${message.guild.id}`, rol.id);
    const embed = new Discord.MessageEmbed()
    .setTitle("Üye Rolü Ayarlanmıştır")
    .setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
  .setTimestamp()
   .setColor("BLUE")
  .setDescription(`> **Üye Rolü <@&${rol.id}> Olarak Ayarlandı!**
  > **Üye Rolünü Ayarlayan Yetkili : \`${message.author.username}\`**   
      `);
  message.channel.send(embed);
  }
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: [],
  permlevel: 0
}
exports.help = {
  name: 'kayıt-rol',
  description: 'erkek rolünü ayarlar',
  usage: '!erkek-rol @rol'
}