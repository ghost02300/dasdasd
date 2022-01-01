const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {

  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(
    new Discord.MessageEmbed()
  .setTitle("Yetkiniz Yetersiz!")
  .setColor("BLUE")
  .setDescription(`**<a:cikis:848525086184570891> Bu Komudu Kullanabilmen İçin \`Yönetici\` Yetkisine Sahip Olmanız Lazım!**`)
  .setFooter(`${client.user.username} Bot`)
  .setTimestamp()
    )

if (args[0] == "erkek") {
    if (db.has(`erkekrol_${message.guild.id}`) === false) {
      return message.channel.send(
        new Discord.MessageEmbed()
        .setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
        .setTimestamp()
        .setColor("BLUE")
        .setDescription(`**Erkek Rolü Zaten Ayarlı Değil**`));
      }
      db.delete(`erkekrol_${message.guild.id}`);
      const embedi =  new Discord.MessageEmbed()
      .setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
      .setTimestamp()
        .setColor("BLUE")
        .setDescription(`**Erkek Rolü Sıfırlandı!**`);
        return message.channel.send(embedi)
    }

    if (args[0] == "kız") {
      if (db.has(`kızrol_${message.guild.id}`) === false) {
        return message.channel.send(
          new Discord.MessageEmbed()
          .setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
          .setTimestamp()
          .setColor("BLUE")
          .setDescription(`**Kız Rolü Zaten Ayarlı Değil**`));
        }
        db.delete(`kızrol_${message.guild.id}`);
        const embedi =  new Discord.MessageEmbed()
        .setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
        .setTimestamp()
          .setColor("BLUE")
          .setDescription(`**Kız Rolü Sıfırlandı!**`);
          return message.channel.send(embedi)
      }

      if (args[0] == "üye") {
        if (db.has(`Üyerol_${message.guild.id}`) === false) {
          return message.channel.send(
            new Discord.MessageEmbed()
            .setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()
            .setColor("BLUE")
            .setDescription(`**Üye Rolü Zaten Ayarlı Değil**`));
          }
          db.delete(`Üyerol_${message.guild.id}`);
          const embedi =  new Discord.MessageEmbed()
          .setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
          .setTimestamp()
            .setColor("BLUE")
            .setDescription(`**Üye Rolü Sıfırlandı!**`);
            return message.channel.send(embedi)
        }
    }
    exports.conf = {
        enabled: true,
        guildonly: false,
        aliases: ['kayıtsıfırla', 'ksıfırla'],
        permlevel: 0
      }
      exports.help = {
        name: 'kayıt-sıfırla',
        description: 'erkek rolünü ayarlar',
        usage: '!erkek-rol @rol'
      }