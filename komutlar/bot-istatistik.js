const Discord = require(`discord.js`);
const db = require('quick.db');
const moment = require("moment");
require("moment-duration-format");
exports.run = async(client, message, args) => {

const embed1 = new Discord.MessageEmbed()
.setTitle(`${client.user.username} Bot`)
.setDescription(":hourglass_flowing_sand: **| Lütfen bekleyin, veriler alınıyor.**")
.setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
  const duration = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
  const istatistikozel = new Discord.MessageEmbed()
  .setColor(0x36393F)
  .setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
.setDescription(`**${client.user.username} Bot**`)
.addField(`Bot Sahibi`, `<@690465699201810433>`, true)
.addField(`Bot Geliştiricisi`, `<@690465699201810433>`, true)
  .addField("<a:bekle:848525533682860083> Bellek Kullanımı", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
.addField("<:yzdelikdilim:848525148087648257> Sunucu Sayısı", `${client.guilds.cache.size.toLocaleString()}`, true)
.addField("<a:twitchbit:848525534996463636> Toplam Kullanıcı Sayısı", `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`, true)
.addField(`<:uptimeicon:848526581257338920> Ne Kadar Süredir Aktif`, `${duration}`, true)
.addField(`Destek Sunucum`, `[Tıkla](https://discord.gg/h2G4hnMATM)`, true)
.addField(`Botu Davet Et`, `[Tıkla](https://discord.com/oauth2/authorize?client_id=826542677981134859&scope=bot&permissions=8)`, true)
.addField(`Bota Oy Ver`, `[Tıkla](https://botsfordiscord.com/bot/826542677981134859/vote)`, true)
  message.channel.send(embed1).then(message => {
      setTimeout(function () {
          message.edit(istatistikozel)
  }, 5000);
  });
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['istatistik', 'i', 'istatistikler', 'botbilgi', 'bilgi', 'hakkında', 'bot hakkında', 'bothakkında'],
      kategori: "Bot",
  permLevel: 0
};

exports.help = {
  name: 'bilgi',
  description: 'Bot ile ilgili bilgi verir.',
  usage: 'bilgi'
};