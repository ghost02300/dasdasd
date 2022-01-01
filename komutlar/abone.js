const Discord = require('discord.js');
const db = require('croxydb');
exports.run = async (client, message, args) => {

  const Abonesistemi = await db.fetch(`abonesistem_${message.guild.id}`)
  if(Abonesistemi == null) return message.channel.send('Abone Sistemi Aktif Değil!');

 if(!message.member.roles.cache.has(db.fetch(`aboneyetkilirol_${message.guild.id}`))) {
    return message.channel.send(
      new Discord.MessageEmbed()
      .setTitle("Yetersiz Yetki!")
.setColor("BLUE")
.setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
.setTimestamp()
.setDescription("Bu Komutu Kullanabilmek İçin Gerekli Yetkiye Sahip Değilsin!")
      )
 }
  let user = message.mentions.members.first()
  let abonelog = await db.fetch(`abonelog_${message.guild.id}`)
   if (!user) return message.channel.send(
   
    new Discord.MessageEmbed()
    .setTitle("Birini Etiketle!")
    .setColor("BLUE")
    .setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
    .setTimestamp()
    .setDescription("**Kime Rol Verceğimi Yazmadın!**")).catch(console.error);
   if(!abonelog) return message.channel.send(
    new Discord.MessageEmbed() 
    .setTitle("Log Kanalı Ayarlı Değil!")
    .setColor("BLUE")
    .setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
    .setTimestamp()
    .setDescription("**Abone log kanalı ayarlanmamış!**"))
   
   if (user.roles.cache.has(db.fetch(`abonerol_${message.guild.id}`))) return message.channel.send(
    new Discord.MessageEmbed()
    .setColor("BLUE")
    .setTitle("Hata - 404") 
    .setFooter(`${client.user.username} Bot`)
    .setTimestamp()
    .setDescription("**Bu Kullanıcıda Abone Rolü Var!**")
    )

  user.roles.add(db.fetch(`abonerol_${message.guild.id}`))

  const embed1 = new Discord.MessageEmbed()
  .setTitle(`${client.user.username} Bot`)
  .setDescription(":hourglass_flowing_sand: **| Ekran Görüntüsü Kontrol Ediliyor...**")
  .setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))

  const abone = new Discord.MessageEmbed()
  .setColor('RANDOM')
  .setTimestamp()
  .setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
  .setTitle("Abone Rolü Verildi!")
  .setDescription(`> **<a:giris:848525087262113802> Abone Rolü Alan Kullanıcı : ${user}**
  > **<:Settings:862390608651223051> Yetkili : ${message.author}**
  `)
  .setThumbnail(message.mentions.users.first().avatarURL({dynamic: true}))
  message.guild.channels.cache.get(abonelog).send(embed1).then(message => {
    setTimeout(function () {
        message.edit(abone)
}, 1000);
});
  db.add(`aboneistatistik_${message.author.id}.${message.guild.id}`, 1)
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['a']
};

exports.help = {
  name: "abone",
  description: "",
  usage: "abone"
};