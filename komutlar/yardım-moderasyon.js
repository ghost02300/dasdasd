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
       .setTitle(`**Hyper Bot Moderasyon Menüsüne Hoşgeldiniz**`)
        .setDescription(`
        **» ${prefix}ban ** İD Yada Etiket İle Sunucudan Yasaklarsınız.
        **» ${prefix}kick ** İD Yada Etiket İle Sunucudan Atarsınız.
        **» ${prefix}mod-log ** Sunucudaki Herşeyin Log'unu Tutar.
        **» ${prefix}sil ** Belirlenen Miktarda Mesaj Siler.
        **» ${prefix}güvenlik ** Resimli Güvenlik Resmi Atar.
        **» ${prefix}küfürengel** Küfür Sistemini Açar/Kapatırsınız.
        **» ${prefix}reklamengel** Reklam Engel Sistemini Açar/Kapatırsınız.
        **» ${prefix}unban ** İdsi Girelen Kullanıcıyı Banının Açar.
        **» ${prefix}davet-log ** Davet Sistemi **${prefix}davetlerim Yazarak Davet Sayınıza Bakabilirsiniz.** **(__KAPALIDIR__)**
        **» ${prefix}oto-tag ** Sunucuya Giren Kişiye Otomatik Tag Verir.
        **» ${prefix}giriş-çıkış-ayarla ** Resimli Giriş / Çıkış Ayarlarsınız.
        **» ${prefix}oto-rol ** Sunucuya Giren Kişilere Otomatik Rol Verir.
        **» ${prefix}kanal-arındır ** Sunucudaki Bütün Kanalları Siler.
		**» ${prefix}nuke ** Kullanılan Kanalı Siler Yerine Aynı Kanalı Açar.

  ▬▬▬▬▬▬▬▬ \`\`\Genel Komutlar\`\`\ ▬▬▬▬▬▬▬▬

**»  ${prefix}davet __Botu Davet Edebilirsiniz!__**
**»  ${prefix}sunucutanıt __Sunucunuzu Tanıtabilirsiniz.__**(Premium)
**»  ${prefix}istatistik __Yazarak Botun İstatistiklerini Göre Bilirsiniz.__**
**»  ${prefix}prefix __Yazarak Botun Prefixini Değiştirebilirsiniz.__**
**»  ${prefix}prefix-sıfırla __Yazarak Ayarladığınız Prefixi Sıfırlayabilirsiniz.__**

`)
        .setThumbnail(`https://cdn.discordapp.com/avatars/833018311763558431/f63a81ec81de35f82dfcb824bb024829.png?size=4096`)
        .addField(`» Hyper Bot Bağlantıları`, `[Bot Davet Linki](https://discord.com/oauth2/authorize?client_id=826542677981134859&scope=bot&permissions=8) **|** [Destek Sunucusu](https://discord.gg/4jydw2xdQQ) **|** [Oy Linki](https://botsfordiscord.com/bot/826542677981134859/vote) **|**`)
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.displayAvatarURL({dynamic: true}))
    return  message.channel.send(embed);
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
};

exports.help = {
  name: 'moderasyon',
  description: 'a!davet-sistemi Menüsü',
  usage: 'yardım'
};