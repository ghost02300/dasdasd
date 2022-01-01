const ayarlar = require("../ayarlar.json");
const db = require("quick.db");
const Discord = require('discord.js');
let talkedRecently = new Set();
module.exports = async message => {
  if (talkedRecently.has(message.author.id)) {
    return;
  }
  talkedRecently.add(message.author.id);
  setTimeout(() => {
    talkedRecently.delete(message.author.id);
  });
  let client = message.client;
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || ayarlar.prefix;
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(" ")[0].slice(prefix.length);
  let params = message.content.split(" ").slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    
 //____________________________________________________________________________________________\\   
 let kurallar = db.fetch(`kurallar_${client.id}`);
 if (kurallar == null) kurallar = "0";
    let csdd = db.get(`rules.${message.author.id}`);
    if (!csdd) {
    let dcs15 = new Discord.MessageEmbed()
      .setFooter(`${kurallar} Kullanıcı kabul etti`)
      .setTimestamp()
      .setTitle(`<:Belge:851924220320677899> Hyper Bot | Kullanım Şartları <:Belge:851924220320677899>`)
      .setImage("https://cdn.discordapp.com/attachments/852288852718387261/853232643729915944/Minimalist_Tech_Etsy_Banner_3.png")
      .setDescription(`
      <a:giris:848525087262113802> **Herhanhi bir şekilde altyapısının çıkarmaya çalışmamak,**
      <a:giris:848525087262113802> **Komut spamı yapmamak,**
      <a:giris:848525087262113802> **Küfür gibi rahatsız edici davranışlarda bulunmamak,**
      <a:giris:848525087262113802> **Hata ve ya açık bulup kullanmayıp direk bildirmek,**
      <a:giris:848525087262113802> **Ben botun sahibiyim diye gezinmek kişileri bildirmek**
      <a:giris:848525087262113802> **Karalisteye firecek hareketlerde bulunmamak**
      <a:giris:848525087262113802> **Troll yapmamak**
      <a:giris:848525087262113802> **Hyper botu Amacı Dışında Kullanmamak**
      <a:giris:848525087262113802> **Botu Fake Sunuculara Eklememek**
 `)
      .setColor("BLUE");
      
    return message.channel.send(dcs15).then(sunucu => {
      sunucu.react("✅");
  
      let cso = (reaction, user) =>
      reaction.emoji.name === "✅" && user.id === message.author.id;
     
  
      let csv = sunucu.createReactionCollector(cso, { time: 0 });
      
  
      csv.on("collect", async r => {
        db.add(`kurallar_${client.id}`, 1)        
        message.reply("**Kurallarımızı Kabul Ettiğiniz İçin Teşekkürler Botumuzu Artık Sorunsuz Bir Şekilde Kullana Bilirsiniz!**").then(cs => cs.delete({ timeout: 5000 }));
        message.delete({ timeout: 100 });
        sunucu.delete({ timeout: 100 });
        db.set(`rules.${message.author.id}`, "VERIFY");
  });			  

    });
    }
//____________________________________________________________________________________________\\   
    
//____________________________________________________________________________________________\\

    
 let bakım = await db.fetch("bakım");
    if (message.author.id !== '690465699201810433') {
 if (bakım) {



        return message.channel.send(
          new Discord.MessageEmbed()
          .setColor('BLUE')
          .setTimestamp()
          .setAuthor("Hyper", `${client.user.avatarURL()}`)
          .setThumbnail(message.author.avatarURL({ dynamic: true, format: "png", size: 1024 }))
          .setDescription(`
> **<:danger:799004396771737610>**|** Sizlere En İyi Hizmeti Verebilmek İçin Bakımdayız.**
> 
> **<:voice:798915965663969301>**|** __Bakım Sebebi__: \`${bakım}\`**
> 
> [Detaylı Bilgi İçin - Destek Sunucumuz](https://discord.gg/2B6th9VMdh)
`));
      }
    }   
//____________________________________________________________________________________________\\  
/*
client.channels.cache.get("859011426865643520").send(new Discord.MessageEmbed()
 .setColor("RANDOM")
.setThumbnail(message.author.avatarURL({dynamic:true})) 
.setDescription("**Bir Komut Kullanıldı!** \n\n **Komut İsmi** → ``" + cmd.help.name + "`` \n **Kullanan Kişi** → <@"+message.author.id+"> | ``"+client.users.cache.get(message.author.id).tag+"`` \n **Kullanılan Sunucu** → ``"+message.guild.name+"``")
)
*/
//____________________________________________________________________________________________\\ 
    if (perms < cmd.conf.permLevel) return;
   cmd.run(client, message, params, perms);

  }
};
