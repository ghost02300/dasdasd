const Discord = require("discord.js");
const db = require("quick.db");
const soulcastle = require("../ayarlar.json")
exports.run = async(client, message, args) => {
  
  let prefix = await db.fetch(`prefix.${message.guild.id}`) || soulcastle.prefix 

  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('<a:cikis:848525086184570891> bu özelliği kullanabilmek için `Sunucuyu Yönet` iznine sahip olmalısınız')
  
  if (db.has(`botkoruma_${message.guild.id}`) === false) {
    return message.channel.send(
      new Discord.MessageEmbed()
           .setColor('BLUE')
           .setFooter(`${client.user.username} Bot`,`${client.user.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
           .setTimestamp()
           .setTitle("Hatalı Kullanım!")
           .setDescription(`**<a:cikis:848525086184570891> Bot Koruma Sistemi Kapalı!** \n\nAçmak İçin : ${prefix}bot-koruma aç`)
      );
  }
  if (!args[1])
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor('BLUE')
        .setFooter(`${client.user.username} Bot`,`${client.user.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
        .setTimestamp()
        .setTitle("Hatalı Kullanım!")
        .setDescription(`**<a:cikis:848525086184570891> Lütfen Belirli Bir Bot** \`ID\` **Giriniz** \n Örnek Kullanımı :\n \`${prefix}bot-izin ver İD\``));

  if (isNaN(args[1])) {
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor('BLUE')
        .setFooter(`${client.user.username} Bot`,`${client.user.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
        .setTimestamp()
        .setTitle("Hatalı Kullanım!")
        .setDescription(`**<a:cikis:848525086184570891> Lütfen Belirli Bir Bot** \`ID\` **Giriniz**`));
  }
  if (args[0] == "ver") {
    client.users.cache.get(args[0]);
    db.set(`botizin_${message.guild.id}.${args[1]}`, "aktif");
    message.channel.send(args[1] + "**<a:giris:848525087262113802> ID li Bota Giriş İzni Verildi**");
  }
  if (args[0] == "kaldır") {
    db.delete(`botizin_${message.guild.id}.${args[1]}`, "aktif");
    message.channel.send(args[1] + " **<a:giris:848525087262113802> ID li Botun Giriş İzni Kaldırıldı**");
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["botizin"],
  permLevel: 0
};

exports.help = {
  name: 'bot-izin',
  description: 'Mod-Log kanalını belirler.',
  usage: 'mod-log <#kanal>'
};