const Discord = require(`discord.js`);
const db = require('quick.db');

exports.run = async(client, message, args) => {
  if(!message.member.roles.cache.has(db.fetch(`kayıtçırol_${message.guild.id}`))) {
    return message.channel.send("Bu Komutu Kullanabilmek İçin Abone Yetkilisi Rolüne Sahip Olman Gerekir!")
  }
    let kişi = message.mentions.users.first() 
if(!args[0]) {
    const kayıtsayı = await db.fetch(`kayıtsayı_${message.author.id}.${message.guild.id}`)
    const üyesayısı = await db.fetch(`üyekayıt_${message.author.id}.${message.guild.id}`)
    const kızkayıt = await db.fetch(`kızkayıt_${message.author.id}.${message.guild.id}`)
    const toplamkayıt = await db.fetch(`toplamkayıt_${message.author.id}.${message.guild.id}`)
    const Hyper1 = new Discord.MessageEmbed() 
    .setThumbnail(message.author.avatarURL())
    .setTimestamp()
    .setFooter(`${client.user.username} Bot`)
    .setDescription(`**${message.author} İsimli Yetkilinin Kayıt İstatistikleri;**

    <:user_woman:862071173944836136> **Kız  \`${kızkayıt ? kızkayıt : '0'}\` Kız Üye Kayıt Etmiş.**

    <:user_man:862071104289112084> **Erkek \`${kayıtsayı ? kayıtsayı : '0'}\` Erkek Üye Kayıt Etmiş.**

    <:user_member:862426603538481202> **Üye \`${üyesayısı ? üyesayısı : '0'}\` Üye Kayıt Etmiş.**

    <:yzdelikdilim:848525148087648257> **Toplam \`${toplamkayıt ? toplamkayıt : '0'}\` Toplam Kayıt Sayısı.**
`)
    message.channel.send(Hyper1)}
if(kişi) {
    const kayıtsayı2 = await db.fetch(`kayıtsayı_${message.author.id}.${message.guild.id}`)
    const kızkayıt2 = await db.fetch(`kızkayıt_${message.author.id}.${message.guild.id}`)
    const toplamkayıt2 = await db.fetch(`toplamkayıt_${message.author.id}.${message.guild.id}`)
    const Hyper = new Discord.MessageEmbed()
    .setThumbnail(message.mentions.users.first().avatarURL())
    .setTimestamp()
    .setFooter(`${message.author.tag} Tarafından İstendi.`)
    .setDescription(`<@${kişi.id}> **İsimli Yetkilinin Bilgileri**

    <:user_woman:862071173944836136> **Kız  \`${kızkayıt2 ? kızkayıt2 : '0'}\` Kız Üye Kayıt Etmiş.**

    <:user_man:862071104289112084> **Erkek \`${kayıtsayı2 ? kayıtsayı2 : '0'}\` Erkek Üye Kayıt Etmiş.**

    <:user_member:862426603538481202> **Üye \`${üyesayısı2 ? üyesayısı2 : '0'}\` Üye Kayıt Etmiş.**

    <:yzdelikdilim:848525148087648257> **Toplam \`${toplamkayıt2 ? toplamkayıt2 : '0'}\` Toplam Kayıt Sayısı.**
    `)
    message.channel.send(Hyper)}  
};
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ["kayıtstats"],
 permLevel: 0,
};
exports.help = {
 name: 'kayıt-stats'
};