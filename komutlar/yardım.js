const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');
const talkedRecently = new Set();
let botid = ('826542677981134859') 
 
exports.run = async(client, message, args) => { 
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "!";

    const embed = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username} `, client.user.displayAvatarURL({dynamic: true}))
        .setColor('BLUE')
       .setTitle(`**Hyper Bot Yardım Menüsüne Hoşgeldiniz**`)
        .setDescription(`
  **» ${prefix}premium-sistemi** Premium Komutlarını Gösterir.		
  **» ${prefix}moderasyon** Moderasyon Komutlarını Gösterir.
  **» ${prefix}kullanıcı** Kullanıcı Komutlarıni Gösterir.
  **» ${prefix}eğlence ** Eğlence Komutlarını Gösterir.
  **» ${prefix}guard** Guard Komutlarını Gösterir.
  **» ${prefix}kullanıcı** Kullanıcı Komutlarını Gösterir.

  **» ${prefix}abone-sistemi ** Abone Komutlarını Gösterir.
  **» ${prefix}kayıt-sistemi** Kayıt Komutlarını Gösterir.
  **» ${prefix}jail-sistemi** Jail Komutlarını Gösterir.
  **» ${prefix}uyarı-sistemi** Jail Komutlarını Gösterir.

  ▬▬▬▬▬▬▬▬ \`\`\Genel Komutlar\`\`\ ▬▬▬▬▬▬▬▬

**»  ${prefix}davet __Botu Davet Edebilirsiniz!__**
**»  ${prefix}sunucutanıt __Sunucunuzu Tanıtabilirsiniz.__ (Premium)**
**»  ${prefix}istatistik __Yazarak Botun İstatistiklerini Göre Bilirsiniz.__**
**»  ${prefix}prefix __Yazarak Botun Prefixini Değiştirebilirsiniz.__**

`)
        .setThumbnail(`https://cdn.discordapp.com/avatars/833018311763558431/f63a81ec81de35f82dfcb824bb024829.png?size=4096`)
        .addField(`» Hyper Bot Bağlantıları`, `[Bot Davet Linki](https://discord.com/oauth2/authorize?client_id=826542677981134859&scope=bot&permissions=8) **|** [Destek Sunucusu](https://discord.gg/4jydw2xdQQ) **|** [Oy Linki](https://botsfordiscord.com/bot/826542677981134859/vote) **|**`)
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.displayAvatarURL({dynamic: true}))
    return  message.channel.send(embed);
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yardım'],
  permLevel: 0,
};

exports.help = {
  name: 'yardım',
  description: 'a!davet-sistemi Menüsü',
  usage: 'yardım'
};