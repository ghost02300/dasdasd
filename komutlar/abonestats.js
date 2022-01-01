const Discord = require(`discord.js`);
const db = require('croxydb');

exports.run = async(client, message, args) => {
  if(!message.member.roles.cache.has(db.fetch(`aboneyetkilirol_${message.guild.id}`))) {
    return message.channel.send("Bu Komutu Kullanabilmek İçin Abone Yetkilisi Rolüne Sahip Olman Gerekir!")
  }
    let kişi = message.mentions.users.first()
if(!args[0]) {
    const abonestats = await db.fetch(`aboneistatistik_${message.author.id}.${message.guild.id}`)
    const codework1 = new Discord.MessageEmbed()
    .setThumbnail(message.author.avatarURL({dynamic: true}))
    .setTimestamp()
    .setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
    .setDescription(`**${message.author} İsimli Yetkilinin Toplam Kayıtı**
    **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
    **<a:mavihype:848529559518314537> Toplam \`${abonestats ? abonestats : '0'}\` Abone Rolü Vermişsin.**
    **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`)
    message.channel.send(codework1)}
if(kişi) {
    const abonestats2 = await db.fetch(`aboneistatistik${kişi.id}.${message.guild.id}`)
    const codework = new Discord.MessageEmbed()
    .setAuthor(kişi.username, kişi.avatarURL)
    .setThumbnail(message.mentions.users.first().avatarURL({dynamic: true}))
    .setTimestamp()
    .setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
    .setDescription(`**Yetkilinin Bilgileri**
    **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**
    **<a:mavihype:848529559518314537> Toplam \`${abonestats2 ? abonestats2 : '0'}\` Abone Rolü Vermiş.**
    **▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬**`)
    message.channel.send(codework)}  
};
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ["abone-istatistik","abone-stats","abonestats"],
 permLevel: 0,
};
exports.help = {
 name: 'aboneistatistik'
};