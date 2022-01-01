const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const { Client, Util } = require('discord.js');
require('./util/eventLoader.js')(client);
const fs = require('fs');
const  db  = require('quick.db');
const moment = require("moment");

const express = require("express")
const app = express()
app.get("/foo", (req, res, next) => {
    const foo = JSON.parse(req.body.jsonString)
})
process.on("unhandledRejection", (reason, promise) => {})

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  
  //----------------Komut Algılayıcısı----------------\\

  //---------------Perms Yerleştirmeleri--------------\\
  
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

//---------------Perms Yerleştirmeleri--------------\\

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});


//____________________________________________________________________________________________\\  

//________________ Komutlar _______________\\  


//__________________________________________TANIM__________________________________________//
const logs = require('discord-logs');
logs(client);
//__________________________________________TANIM__________________________________________//

//______________________________________KANAL SİLİNDİ______________________________________//
client.on("channelDelete",async (channel) => {
let modlog = await db.fetch(`log_${channel.guild.id}`);
if (!modlog) return;

const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setFooter(`Eylemi Gerçekleştiren: ${entry.executor.tag}`,`${entry.executor.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
.setDescription(`**#${channel.name}**(\`${channel.id}\`) Adlı Kanal Silindi.\n\n **__Silen Kişi__** **<@${entry.executor.id}>** (\`${entry.executor.id}\`) \n\n **__Silinen Kanal Türü__** : **${channel.type}**`)
.setThumbnail(entry.executor.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setColor("RED");
return client.channels.cache.get(modlog).send(embed);
});

//______________________________________KANAL SİLİNDİ______________________________________//

//_____________________________________KANAL OLUŞTURMA_____________________________________//
client.on("channelCreate", async function(channel)  {
let modlog = await db.fetch(`log_${channel.guild.id}`);
if (!modlog) return;

const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setFooter(`Eylemi Gerçekleştiren: ${entry.executor.tag}`,`${entry.executor.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
.setDescription(`**#${channel.name}**(\`${channel.id}\`) Adlı Kanal Oluşturuldu.\n\n **__Oluşturan Kişi__** **<@${entry.executor.id}>** (\`${entry.executor.id}\`) \n\n **__Oluşturulan Kanal Türü__** : **${channel.type}**`)
.setThumbnail(entry.executor.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setColor("RED");
return client.channels.cache.get(modlog).send(embed);
});
//_____________________________________KANAL OLUŞTURMA_____________________________________//

//____________________________________KANAL GÜNCELLENDİ____________________________________//

client.on("channelUpdate", async function(oldChannel, newChannel) {

let modlog = await db.fetch(`log_${oldChannel.guild.id}`);
if (!modlog) return;

const entry = await oldChannel.guild.fetchAuditLogs({type : "CHANNEL_UPDATE"}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setFooter(`Eylemi Gerçekleştiren: ${entry.executor.tag}`,`${entry.executor.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
.setDescription(`**#${oldChannel.name}**(\`${oldChannel.id}\`) Adlı Kanal'da Değişiklik Yapıldı.\n\n **__Yapan Kişi__** : **<@${entry.executor.id}>**(\`${entry.executor.id}\`) \n\n **__Değişiklik Yapılan Kanal Türü__** : ${oldChannel.type}`)
.setThumbnail(entry.executor.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setColor("RED");
return client.channels.cache.get(modlog).send(embed);
});

//____________________________________KANAL GÜNCELLENDİ____________________________________//

//_____________________________________KANAL SABİTLEME_____________________________________//

client.on("channelPinsUpdate", async function(channel) {

let modlog = await db.fetch(`log_${channel.guild.id}`);
if (!modlog) return;

const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_UPDATE'}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setFooter(`Eylemi Gerçekleştiren: ${entry.executor.tag}`,`${entry.executor.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
.setDescription(`**#${channel.name}**(\`${channel.id}\`) adlı kanal'da Sabitlemelerde Değişiklik Tespit Edildi.\n\n **__Yapan Kişi__** : <@${entry.executor.id}>(\`${entry.executor.id}\`)`)
.setThumbnail(entry.executor.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setColor("RED");

  return client.channels.cache.get(modlog).send(embed);

});

//_____________________________________KANAL SABİTLENME_____________________________________//

//__________________________________KANAL AÇIKLAMA DEĞİŞME__________________________________//

client.on("guildChannelTopicUpdate", async(channel, oldTopic, newTopic) => {

let modlog = await db.fetch(`log_${channel.guild.id}`);
if (!modlog) return;

const entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_UPDATE'}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()
.setThumbnail(entry.executor.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setColor("RED")   
.setAuthor(client.user.username, client.user.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setFooter(`Eylemi Gerçekleştiren: ${entry.executor.tag}`,`${entry.executor.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
.setDescription('**Kanal Açıklaması Güncellendi**')
.addField("__Eski Durum__ ", `\`\`\`${oldTopic}\`\`\``, true)
.addField("__Yeni Durum__", `\`\`\`${newTopic}\`\`\``, true)

 client.channels.cache.get(modlog).send(embed);
     
});
//__________________________________KANAL AÇIKLAMA DEĞİŞME__________________________________//

//_____________________________________EMOJİ OLUŞTURMA______________________________________//


client.on("emojiCreate", async function(emoji) {

let modlog = await db.fetch(`log_${emoji.guild.id}`);
if (!modlog) return;

const entry = await emoji.guild.fetchAuditLogs({type: 'EMOJI_CREATE'}).then(audit => audit.entries.first());

let emojis = emoji;

let embed = new Discord.MessageEmbed()
.setThumbnail(entry.executor.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setColor("RED")   
.setAuthor(client.user.username, client.user.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setFooter(`Eylemi Gerçekleştiren: ${entry.executor.tag}`,`${entry.executor.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
.setDescription(`Sunucuya Yeni Bir Emoji Eklendi => (${emoji}) \n\n **__Emojiyi Ekleyen Kişi__** : **<@${entry.executor.id}>**(\`${entry.executor.id}\`)`)

return client.channels.cache.get(modlog).send(embed);

});

//_____________________________________EMOJİ OLUŞTURMA______________________________________//

//_______________________________________EMOJİ SİLME________________________________________//

client.on("emojiDelete", async function(emoji) {

let modlog = await db.fetch(`log_${emoji.guild.id}`);
if (!modlog) return;

const entry = await emoji.guild.fetchAuditLogs({type: 'EMOJI_DELETE'}).then(audit => audit.entries.first());

let emojis = emoji;

let embed = new Discord.MessageEmbed()
.setThumbnail(entry.executor.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setColor("RED")   
.setAuthor(client.user.username, client.user.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setFooter(`Eylemi Gerçekleştiren: ${entry.executor.tag}`,`${entry.executor.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
.setDescription(`**${emoji.name}** (\`${emoji.id}\`) Adlı Emoji Sunucudan Silindi.\n\n **__Silen Kişi__** : **<@${entry.executor.id}> ** (\`${entry.executor.id}\`)`)

return client.channels.cache.get(modlog).send(embed);

});

//_______________________________________EMOJİ SİLME________________________________________//

//_____________________________________EMOJİ GÜNCELLEME_____________________________________//

client.on("emojiUpdate", async function(oldEmoji, newEmoji) {

let modlog = await db.fetch(`log_${oldEmoji.guild.id}`);
if (!modlog) return;

const entry = await oldEmoji.guild.fetchAuditLogs({type: 'EMOJI_UPDATE'}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()
.setThumbnail(entry.executor.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setColor("RED")   
.setAuthor(client.user.username, client.user.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setFooter(`Eylemi Gerçekleştiren: ${entry.executor.tag}`,`${entry.executor.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
.setDescription(`Bir Emoji Güncellendi Güncellenen Emoji => **${newEmoji}**(\`${newEmoji.id}\`) \n\n **__Emojiyi Güncelleyen Kişi__** :** <@${entry.executor.id}>**(\`${entry.executor.id}\`)`)

  return client.channels.cache.get(modlog).send(embed);

});

//_____________________________________EMOJİ GÜNCELLEME_____________________________________//

//___________________________________KULLANICI YASAKLANMA___________________________________//


client.on("guildBanAdd", async(guild, user) => {

let modlog = await db.fetch(`log_${guild.id}`);
if (!modlog) return;

const entry = await guild.fetchAuditLogs({type: "MEMBER_BAN"}).then(audit => audit.entries.first());
let embed = new Discord.MessageEmbed()
.setFooter(`Eylemi Gerçekleştiren: ${entry.executor.tag}`,`${entry.executor.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
.setThumbnail(user.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setColor("RED")   
.setAuthor(client.user.username, client.user.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setDescription(`**${user.username}**(\`${user.id}\`) Adlı Kullanıcı Sunucudan Banlandi\n\n **__Banlayan Kişi__** **<@${entry.executor.id}>**(\`${entry.executor.id}\`) \n**__Banlama Sebebi__** : \`\`\`${entry.reason}\`\`\``)

client.channels.cache.get(modlog).send(embed)

})

//___________________________________KULLANICI YASAKLANMA___________________________________//

//__________________________________KULLANICI YASAK KALKMA__________________________________//

client.on("guildBanRemove", async(guild, user, message) => {

let modlog = await db.fetch(`log_${guild.id}`);
if (!modlog) return;

const entry = await guild.fetchAuditLogs({type: "MEMBER_BAN_REMOVE"}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()
.setFooter(`Eylemi Gerçekleştiren: ${entry.executor.tag}`,`${entry.executor.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
.setThumbnail(user.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setColor("RED") 
.setDescription(`**${user.username}**(\`${user.id}\`) Adlı Kullanıcının Banı Açıldı.\n\n **__Banını Açan Kişi__** : **<@${entry.executor.id}>**(\`${entry.executor.id}\`)`)

client.channels.cache.get(modlog).send(embed)

})

//__________________________________KULLANICI YASAK KALKMA__________________________________//

//______________________________________MESAJ SİLİNME_______________________________________//

client.on("messageDelete", async function(message) {

if (message.author.bot || message.channel.type == "dm") return;

let modlog = await db.fetch(`log_${message.guild.id}`);
if (!modlog) return;

let embed = new Discord.MessageEmbed()
.setThumbnail(message.author.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setColor("RED")   
.setAuthor(client.user.username, client.user.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setFooter(`Eylemi Gerçekleştiren: ${message.author.tag}`,`${message.author.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
.addField(`__Mesaj Silindi !__`,`**Kullanıcı :** <@${message.author.id}> (${message.author.tag}) \n**Kanal :** <#${message.channel.id}> (${message.channel.name}) \n\n**Mesaj :** __${message.content}__`, false)

return client.channels.cache.get(modlog).send(embed);

});

//______________________________________MESAJ SİLİNME_______________________________________//

//_____________________________________MESAJ GÜNCELLEME_____________________________________//

client.on("messageUpdate", async function(oldMessage, newMessage) {

if (newMessage.author.bot || newMessage.channel.type == "dm") return;

let modlog = await db.fetch(`log_${newMessage.guild.id}`);
if (!modlog) return;

let main = await oldMessage.fetch();

if (oldMessage.content === newMessage.content) return;

let message = newMessage;

let embed = new Discord.MessageEmbed()
.setThumbnail(newMessage.author.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setColor("RED")
.setFooter(`Eylemi Gerçekleştiren: ${newMessage.author.tag}`,`${newMessage.author.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
.setAuthor(client.user.username, client.user.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.addField("Eski Mesajı",`\`${oldMessage.content}\``)
.addField("Yeni Mesajı",`\`${newMessage.content}\``)
.setDescription(`<#${message.channel.id}> Adlı Kanal'da Bir Mesaj Düzenlendi.\n Düzenleyen : **${main.author}**\n Düzenlenen Mesaj İçin: [TIKLA](https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`);

return client.channels.cache.get(modlog).send(embed);

});

//_____________________________________MESAJ GÜNCELLEME_____________________________________//

//_____________________________________ÇOKLU MESAJ SİLME____________________________________//

client.on("messageDeleteBulk", async function(messages) {

let modlog = await db.fetch(`log_${messages.array()[0].guild.id}`);
if (!modlog) return;

let embed = new Discord.MessageEmbed()
.setThumbnail(messages.array()[0].author.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setColor("RED")   
.setAuthor(client.user.username, client.user.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setFooter(`Eylemi Gerçekleştiren: ${messages.array()[0].author.tag}`,`${messages.array()[0].author.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
.setDescription(`**${messages.array()[0].author.username}**(\`${messages.array()[0].author.id}\`) Adlı Kullanıcı **${messages.size}** adet Mesaj Sildi! ** \n\n Sildiği Kanal :<#${messages.array()[0].channel.id}>**`);

return client.channels.cache.get(modlog).send(embed);

});

//_____________________________________ÇOKLU MESAJ SİLME____________________________________//

//____________________________________MESAJA EMOJİ EKLENDİ__________________________________//


client.on("messageReactionAdd", async function(messageReaction, user) {


let message;
  try {
    message = await messageReaction.fetch();
  } catch (err) {
    message = messageReaction;
  }
let modlog = await db.fetch(`log_${message.message.guild.id}`);
if (!modlog) return;

let embed = new Discord.MessageEmbed()
.setThumbnail(user.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setColor("RED")
.setFooter(`Eylemi Gerçekleştiren: ${user.tag}`,`${user.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
.setAuthor(client.user.username, client.user.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setDescription(`\`Bir Mesaja Tepki Eklendi !\``)
.addField("Mesaj Bilgileri",`**__ID__** : ${message.message.id}\n**__Mesaj__** : ${message.message.content || "Mesaj Bilgisi Yok"}\n**__Yapan__** : ${message.message.author.username ||"Bulunamadı!"}`)
.addField("Emoji Bilgileri",`**__Ekleyen Kişi__** : ${user.username}\n**__Kişi ID__** : ${user.id}\n**__Emoji__** : ${message._emoji}`)

  return client.channels.cache.get(modlog).send(embed);

});

//____________________________________MESAJA EMOJİ EKLENDİ__________________________________//

//___________________________________MESAJDAN EMOJİ SİLİNDİ_________________________________//


client.on("messageReactionRemove", async function(messageReaction, user) {

let message;
  try {
    message = await messageReaction.fetch();
  } catch (err) {
    message = messageReaction;
  }
let modlog = await db.fetch(`log_${message.message.guild.id}`);
if (!modlog) return;
  let embed = new Discord.MessageEmbed()
.setThumbnail(user.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setColor("RED")
.setFooter(`Eylemi Gerçekleştiren: ${user.tag}`,`${user.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
.setAuthor(client.user.username, client.user.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setDescription(`\`Bir Mesajdan Tepki Kaldırıldı !\``)
.addField("Mesaj Bilgileri",`**__ID__** : ${message.message.id}\n**__Mesaj__** : ${message.message.content ||"Mesaj Bilgisi Yok"}\n**__Yapan__** : ${message.message.author.username ||"Yok"}`)
.addField("Tepki Bilgisi",`**__Tepkiyi Kaldıran__** : ${user.username}\n**__IDI__** : ${user.id}\n**__Emoji__** : ${message._emoji}`)
  
  return client.channels.cache.get(modlog).send(embed);

});

//___________________________________MESAJDAN EMOJİ SİLİNDİ_________________________________//

//______________________________________ROL OLUŞTURMA_______________________________________//


client.on("roleCreate",async function(role) {

let modlog = await db.fetch(`log_${role.guild.id}`);
if (!modlog) return;

const entry = await role.guild.fetchAuditLogs().then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()
.setThumbnail(entry.executor.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setColor('#FAF3F3')
.setFooter(`Eylemi Gerçekleştiren: ${entry.executor.tag}`,`${entry.executor.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
.setAuthor(client.user.username, client.user.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setDescription(`**${role.name}**(\`${role.id}\`) (\`${role.hexColor}\`) Adlı Rol Oluşturuldu!\n\n **__Oluşturan Kişi__** : <@${entry.executor.id}> (\`${entry.executor.id}\`)`)

  return client.channels.cache.get(modlog).send(embed);

});

//______________________________________ROL OLUŞTURMA_______________________________________//

//_______________________________________ROL SİLİNME________________________________________//

client.on("roleDelete", async function(role) {

let modlog = await db.fetch(`log_${role.guild.id}`);
if (!modlog) return;

const entry = await role.guild.fetchAuditLogs().then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()
.setThumbnail(entry.executor.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setColor('#FAF3F3')
.setFooter(`Eylemi Gerçekleştiren: ${entry.executor.tag}`,`${entry.executor.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
.setAuthor(client.user.username, client.user.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setDescription(`**${role.name}**(\`${role.id}\`) (\`${role.hexColor}\`) Adlı Rol Silindi!\n\n**__Silen Kişi__** : <@${entry.executor.id}> (\`${entry.executor.id}\`)`)

  return client.channels.cache.get(modlog).send(embed);

});

//_______________________________________ROL SİLİNME________________________________________//

//____________________________________DAVET OLUŞTURULDU_____________________________________//


client.on("inviteCreate", async function (message)  {

let modlog = await db.fetch(`log_${message.guild.id}`);
if (!modlog) return;

const entry = await message.guild.fetchAuditLogs({type: 'INVITE_CREATE'}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()
.setThumbnail(entry.executor.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setColor('AQUA')
.setFooter(`Eylemi Gerçekleştiren: ${entry.executor.tag}`,`${entry.executor.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
.setAuthor(client.user.username, client.user.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setDescription(`**__Davet Link__** : ${message} \n\n**__Daveti Oluşturan__** :** <@${entry.executor.id}>**(\`${entry.executor.id}\`)`)

 return client.channels.cache.get(modlog).send(embed);

});

//____________________________________DAVET OLUŞTURULDU_____________________________________//

//______________________________________DAVET SİLİNDİ_______________________________________//


client.on("inviteDelete",async function (message) {

let modlog = await db.fetch(`log_${message.guild.id}`);
if (!modlog) return;

const entry = await message.guild.fetchAuditLogs({type: 'INVITE_DELETE'}).then(audit => audit.entries.first());

let embed = new Discord.MessageEmbed()
.setThumbnail(entry.executor.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setColor('AQUA')
.setFooter(`Eylemi Gerçekleştiren: ${entry.executor.tag}`,`${entry.executor.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
.setAuthor(client.user.username, client.user.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setDescription (`**__Silinen Davet Linki__** : ${message} \n\n **__Daveti Silen Kişi__** : **<@${entry.executor.id}>**(\`${entry.executor.id}\`)`)

 return client.channels.cache.get(modlog).send(embed);

  });

//______________________________________DAVET SİLİNDİ_______________________________________//

//___________________________________KULLANICI ROL VERME____________________________________//

client.on("guildMemberRoleAdd",async (member, role) => {

let modlog = await db.fetch(`log_${member.guild.id}`);
if (!modlog) return;

const entry = await member.guild.fetchAuditLogs({type: ''}).then(audit => audit.entries.first());
 
let embed = new Discord.MessageEmbed()
.setThumbnail(member.user.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setColor('PURPLE')
.setFooter(`Eylemi Gerçekleştiren: ${entry.executor.tag}`,`${entry.executor.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
.setAuthor(client.user.username, client.user.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setDescription(`<@${member.user.id}> **Adlı Kullanıcının Rolleri Güncellendi !**`)
.addField("Verilen Rol:",`✅ ${role}`, false)
.addField(`Rolü Veren Kişi`, `**<@${entry.executor.id}>**(\`${entry.executor.id}\`)`, false)

client.channels.cache.get(modlog).send(embed);
        
});

//___________________________________KULLANICI ROL VERME____________________________________//

//___________________________________KULLANICI ROL ALMA_____________________________________//

client.on("guildMemberRoleRemove", async(member, role) => {

let modlog = await db.fetch(`log_${member.guild.id}`);
if (!modlog) return;

const entry = await member.guild.fetchAuditLogs({type: ''}).then(audit => audit.entries.first());
 
let embed = new Discord.MessageEmbed()
.setThumbnail(member.user.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setColor('PURPLE')
.setFooter(`Eylemi Gerçekleştiren: ${entry.executor.tag}`,`${entry.executor.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
.setAuthor(client.user.username, client.user.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setDescription(`<@${member.user.id}> **Adlı Kullanıcının Rolleri Güncellendi !**`)
.addField("Alınan Rol:", `⛔ ${role}`, true)
.addField(`Rolü Alan Kişi`, `**<@${entry.executor.id}>**(\`${entry.executor.id}\`)`)
               
client.channels.cache.get(modlog).send(embed);
        
});


//___________________________________KULLANICI ROL ALMA_____________________________________//

//________________________________TAKMA ADI GÜNCELLEŞTİRME__________________________________//

client.on("guildMemberNicknameUpdate", async(member, oldNickname, newNickname) => {

let modlog = await db.fetch(`log_${member.guild.id}`);
if (!modlog) return;

const entry = await member.guild.fetchAuditLogs({type: ''}).then(audit => audit.entries.first());
 
let embed = new Discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setColor('GOLD')
.setFooter(`Eylemi Gerçekleştiren: ${entry.executor.tag}`,`${entry.executor.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
.setDescription(`<@${member.user.id}> **Adlı Kullanıcın Takma Adı Güncellendi !** \n\n**__Değiştiren Kişi__** : **<@${entry.executor.id}>**(\`${entry.executor.id}\`)`)
.addField("Eski İsim: ", `\`\`\`${oldNickname ? oldNickname : member.user.username}\`\`\``, true)
.addField("Yeni İsim: ", `\`\`\`${newNickname ? newNickname: member.user.username}\`\`\``, true)
.setThumbnail(member.user.avatarURL({ dynamic: true, format: "png", size: 1024 }))

client.channels.cache.get(modlog).send(embed);
    
});


//________________________________TAKMA ADI GÜNCELLEŞTİRME__________________________________//

//___________________________________BOOST BASMA MESAJ______________________________________//


client.on("guildMemberBoost", async(member) => {

let modlog = await db.fetch(`log_${member.guild.id}`);
if (!modlog) return;
 
let embed = new Discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setColor("#8CFED8")
.setFooter(`Eylemi Gerçekleştiren: ${member.user.tag}`,`${member.user.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
.setDescription(`**<@${member.user.id}>**(\`${member.user.id}\`) **Adlı Kullanıcı Sunucuya Boost Bastı !**`)
.setThumbnail(member.user.avatarURL({ dynamic: true, format: "png", size: 1024 }))
    
  client.channels.cache.get(modlog).send(embed);
});

//___________________________________BOOST BASMA MESAJ______________________________________//

//___________________________________BOOST ÇEKME MESAJ______________________________________//

client.on("guildMemberUnboost", async(member) => {

let modlog = await db.fetch(`log_${member.guild.id}`);
if (!modlog) return;

let embed = new Discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setColor("#8CFED8")
.setFooter(`Eylemi Gerçekleştiren: ${member.user.tag}`,`${member.user.avatarURL({ dynamic: true, format: "png", size: 1024 })}`)
.setDescription(`**<@${member.user.id}>**(\`${member.user.id}\`) **Adlı Kullanıcı Boostunu Çekti !**`)
.setThumbnail(member.user.avatarURL({ dynamic: true, format: "png", size: 1024 }))
             
  client.channels.cache.get(modlog).send(embed);
});

//___________________________________BOOST ÇEKME MESAJ______________________________________//

//________________________________BOOST LEVEL ÇIKIŞ MESAJ___________________________________//

client.on("guildBoostLevelUp", async(guild, oldLevel, newLevel) => {

let modlog = await db.fetch(`log_${oldLevel.guild.id}`);
if (!modlog) return;

let embed = new Discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setColor("#8CFED8")
.setDescription(`**Sunucunun Boost Seviyesi Arttı !**`)
.addField("Eski Level: ", `\`\`\`${oldLevel}\`\`\``, true)
.addField("Yeni Level: ", `\`\`\`${newLevel}\`\`\``, true)
         
  client.channels.cache.get(modlog).send(embed);
});

//________________________________BOOST LEVEL ÇIKIŞ MESAJ___________________________________//

//_________________________________BOOST LEVEL İNİŞ MESAJ___________________________________//


client.on("guildBoostLevelDown", async(guild, oldLevel, newLevel) => {

let modlog = await db.fetch(`log_${oldLevel.guild.id}`);
if (!modlog) return;

let embed = new Discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setColor("#8CFED8")
.setDescription(`**Sunucunun Boost Seviyesi Düştü !!**`)
.addField("Eski Level: ", `\`\`\`${oldLevel}\`\`\``, true)
.addField("Yeni Level: ", `\`\`\`${newLevel}\`\`\``, true)

  client.channels.cache.get(modlog).send(embed);
});

//_________________________________BOOST LEVEL İNİŞ MESAJ___________________________________//

//_____________________________________BÖLGE DEĞİŞİM________________________________________//


client.on('guildRegionUpdate',async (guild, oldRegion, newRegion) => {

let modlog = await db.fetch(`log_${oldRegion.guild.id}`);
if (!modlog) return;
    
const oldUpper = oldRegion.charAt(0).toUpperCase() + oldRegion.substring(1);
const newUpper = newRegion.charAt(0).toUpperCase() + oldRegion.substring(1);
          
let embed = new Discord.MessageEmbed()
.setColor('YELLOW')
.setThumbnail(oldRegion.iconURL.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setAuthor(client.user.username, client.user.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setDescription(`**Sunucu Bölgesi Değiştirildi !** `)
.addField("Eski Bölge ", `\`\`\`${oldUpper}\`\`\``, true)
.addField("Yeni Bölge ", `\`\`\`${newUpper}\`\`\``, true)
            
  client.channels.cache.get(modlog).send(embed);
});

//_____________________________________BÖLGE DEĞİŞİM________________________________________//

//___________________________________AFK KANAL DEĞİŞİM______________________________________//

client.on("guildAfkChannelAdd", async(guild, afkChannel) => {
  
let modlog = await db.fetch(`log_${afkChannel.guild.id}`);
if (!modlog) return;
  
let embed = new Discord.MessageEmbed()
.setColor('YELLOW')
.setAuthor(client.user.username, client.user.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setDescription(`**AFK Kanalı Eklendi !!** `)
.addField('AFK Kanalı:', afkChannel, false)
            
  client.channels.cache.get(modlog).send(embed);
});

//___________________________________AFK KANAL DEĞİŞİM______________________________________//

//___________________________________ Mod Log Son ______________________________________//

//________________ Reklam Engel _______________\\
client.on("message", async message => {
  let reklamsadeengel = await db.fetch(`reklamengel_${message.guild.id}`);
  let reklamsahibi = message.member;
  if (!reklamsadeengel) return;
  if (reklamsadeengel == "Açık") {
const reklam = [
      "discord.app",
      "discord.gg",
      ".com",
      ".net",
      ".xyz",
      ".tk",
      ".me",
      ".gg",
      "www.",
      "https",
      "http",
      ".org",
      ".com.tr",
      ".hub"
    ];
    if (reklam.some(word => message.content.toLowerCase().includes(word))) {
      if (!message.member.hasPermission("ADMINISTRATOR")) {
        message.delete();
        db.add(`reklamengel_${client.id}`, 1)
          let uyari = new Discord.MessageEmbed()
   .setColor("BLUE")
   .setDescription(`<:stop:848525087237341184> **Orda Dur Bakalım! Link Paylaşamazsın, Bu Sunucu** \`${client.user.username}\` **Tarafından Korunuyor**`)
          message.channel.send(uyari).then(msg => msg.delete({ timeout: 6000 }));
        }
      }
    }
  //}
});
//________________ Reklam Engel SON _______________\\

//________________ Davet Sistemi _______________\\ \*
/*
const invites = {};

const wait = require("util").promisify(setTimeout);

client.on("ready", () => {
  wait(1000);

  client.guilds.cache.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});



client.on("guildMemberAdd", async member => {
if(member.user.bot) return;
  member.guild.fetchInvites().then(async guildInvites => {
    let kanal = await db.fetch(`davetlog_${member.guild.id}`);
    if (!kanal) return;
    const ei = invites[member.guild.id];

    invites[member.guild.id] = guildInvites;
    const invite = await guildInvites.find(i => (ei.get(i.code) == null ? (i.uses - 1) : ei.get(i.code).uses) < i.uses);
    const daveteden = member.guild.members.cache.get(invite.inviter.id);

    db.add(`davet_${invite.inviter.id}_${member.guild.id}`, +1);
    db.set(`bunudavet_${member.id}`, invite.inviter.id);
    let davetsayiv2 = await db.fetch(`davet_${invite.inviter.id}_${member.guild.id}`);

    let davetsayi;
    if (!davetsayiv2) davetsayi = 0;
     else davetsayi = await db.fetch(`davet_${invite.inviter.id}_${member.guild.id}`);

client.channels.cache.get(kanal).send(` | ${member} sunucuya katıldı! Sunucuya davet eden **${daveteden}** toplam **${davetsayi}** daveti var`)  

      }
    
  );
});

client.on("guildMemberRemove", async member => {
  let kanal = await db.fetch(`davetlog_${member.guild.id}`);
  if (!kanal) return;
  let davetçi = await db.fetch(`bunudavet_${member.id}`);
  const daveteden = member.guild.members.cache.get(davetçi);
      let mesaj = db.fetch(`davetbbmesaj_${member.guild.id}`)
      db.add(`davet_${davetçi}_${member.guild.id}`, -1);
  let davetsayi = await db.fetch(`davet_${davetçi}_${member.guild.id}`);
  
  if (!davetçi) {
    return client.channels.cache.get(kanal).send(` | ${member} Adlı Kullanıcı Aramızdan Ayarıldı Davet Eden Bulunamadı!`);
  } else {
     
client.channels.cache.get(kanal).send(` | ${member} sunucudan ayrıldı! Sunucuya davet eden ${daveteden}`)  
  
      }
    }
);
*/
//________________ Davet Sistemi SON _______________\\ 

//________________ Otorol _______________\\ 

client.on("guildMemberAdd", async member => {

  let kanal = await db.fetch(`otorolkanal_${member.guild.id}`);
  let rol = await db.fetch(`otorolrol_${member.guild.id}`);
  if(member.user.bot) return;
  if (!kanal) return;
  if (!rol) return;

  let user = client.users.cache.get(member.id);

  client.channels.cache.get(kanal).send(
  new Discord.MessageEmbed()
  .setColor("#d52525")
  .setDescription(`**<a:GiriGif:848525088223133706> ${member.user.tag}** Sunucuya katıldı. Başarıyla, <@&${rol}> rolü verildi.`))
  member.roles.add(rol)
});
//________________ Otorol SON _______________\\



//////////////////////////////////////////////////////////////////////////

client.on("guildMemberAdd", member => {
  let guild = member.guild;
  let kanal = db.fetch(`kayıthg_${member.guild.id}`);
  let kayıtçı = db.fetch(`kayıtçırol_${member.guild.id}`);
  let aylartoplam = {
    "01": "Ocak",
    "02": "Şubat",
    "03": "Mart",
    "04": "Nisan",
    "05": "Mayıs",
    "06": "Haziran",
    "07": "Temmuz",
    "08": "Ağustos",
    "09": "Eylül",
    "10": "Ekim",
    "11": "Kasım",
    "12": "Aralık"
  };
  let aylar = aylartoplam;

  let user = client.users.cache.get(member.id);
  require("moment-duration-format");

  const kurulus = new Date().getTime() - user.createdAt.getTime();
  const ayyy = moment.duration(kurulus).format("M");
  var kontrol = [];

  if (ayyy < 1) {
    kontrol = "**Şüpheli** <a:cikis:848525086184570891>";
  }
  if (ayyy > 1) {
    kontrol = "**Güvenilir** <a:giris:848525087262113802>";
  }

  if (!kanal) return;

  ///////////////////////

  let randomgif = [ 
             "https://media.discordapp.net/attachments/744976703163728032/751451554132918323/tenor-1.gif", "https://media.discordapp.net/attachments/744976703163728032/751451693992116284/black.gif", "https://media.discordapp.net/attachments/765870655958548490/765871557993824256/tumblr_ozitqtbIIf1tkflzao1_540.gif", "https://media.discordapp.net/attachments/765870655958548490/765871565257965578/68747470733a2f2f692e70696e696d672e636f6d2f6f726967696e616c732f32622f61352f31312f32626135313161663865.gif"];

  ///////////////////
  client.channels.cache.get(kanal).send(`<@&${kayıtçı}>`);
  const embed = new Discord.MessageEmbed()
    .setColor("36393F")
    .setImage(randomgif[Math.floor(Math.random() * randomgif.length)])
    .setThumbnail(
      user.avatarURL({
        dynamic: true,
        format: "gif",
        format: "png",
        format: "jpg",
        size: 2048
      })
    )

    .setDescription(
      `<a:B_Pikachu:848525086242635778> **Hoşgeldin!** ${
        member.user
      }, seninle beraber **${
        guild.memberCount
      }** kişi olduk! \n <a:elmas:848590371486957629> Kaydının yapılması için  **İsim** ve **Yaş** Yazman Gerek. \n <a:waiting:840332458716954655> Hesap Kuruluş: **${moment(
        user.createdAt
      ).format("DD")} ${aylar[moment(user.createdAt).format("MM")]} ${moment(
        user.createdAt
      ).format(
        "YYYY HH:mm:ss"
       )}** \n <a:bekle:848525533682860083> Bu vatandaş: ${kontrol} \n <a:yildiz:848590945212956723> <@&${kayıtçı}> Rolundeki Yetkililer Sizinle İlgilecektir

  `
    );

  
  client.channels.cache.get(kanal).send(embed);
});

//________________ Resimli HG HB _______________\\
client.on("guildMemberRemove", async member => {
  if (db.has(`gçkanal_${member.guild.id}`) === false) return;
  var canvaskanal = member.guild.channels.cache.get(
    db.fetch(`gçkanal_${member.guild.id}`)
  );
  if (!canvaskanal) return;

  const request = require("node-superfetch");
  const Canvas = require("canvas"),
    Image = Canvas.Image,
    Font = Canvas.Font,
    path = require("path");

  var randomMsg = ["Sunucudan Ayrıldı."];
  var randomMsg_integer =
    randomMsg[Math.floor(Math.random() * randomMsg.length)];

  let msj = await db.fetch(`cikisM_${member.guild.id}`);
  if (!msj) msj = `{uye}, ${randomMsg_integer}`;

  const canvas = Canvas.createCanvas(640, 360);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage(
    "https://cdn.discordapp.com/attachments/835473667567386654/841032087041605642/GORUSURUZ.png" //buraya bb resmini koyabilirsiniz dc linkiyle resim linkini kopyalayın yeni sekmede acın ona gore bb yazısını koyarsınız.
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#74037b";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = `#ffffff`;
  ctx.font = `37px "BornStrong"`;
  ctx.textAlign = "center";
  ctx.fillText(`${member.user.username}`, 300, 342);

  let avatarURL = member.user.displayAvatarURL({
    format: "png",
    dynamic: true,
    size: 1024
  });
  const { body } = await request.get(avatarURL);
  const avatar = await Canvas.loadImage(body);

  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.arc(250 + 55, 55 + 55, 55, 0, 2 * Math.PI, false);
  ctx.clip();
  ctx.drawImage(avatar, 250, 55, 110, 110);

  const attachment = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "hyper-bot-güle-güle.png"
  );

  canvaskanal.send(attachment);
  canvaskanal.send(
    msj.replace("{uye}", member).replace("{sunucu}", member.guild.name)
  );
  if (member.user.bot)
    return canvaskanal.send(`🤖 Bu bir bot, ${member.user.tag}`);
});

client.on("guildMemberAdd", async member => {
  if (db.has(`gçkanal_${member.guild.id}`) === false) return;
  var canvaskanal = member.guild.channels.cache.get(
    db.fetch(`gçkanal_${member.guild.id}`)
  );

  if (!canvaskanal || canvaskanal === undefined) return;
  const request = require("node-superfetch");
  const Canvas = require("canvas"),
    Image = Canvas.Image,
    Font = Canvas.Font,
    path = require("path");

  var randomMsg = ["Sunucuya Katıldı."];
  var randomMsg_integer =
    randomMsg[Math.floor(Math.random() * randomMsg.length)];

  let paket = await db.fetch(`pakets_${member.id}`);
  let msj = await db.fetch(`cikisM_${member.guild.id}`);
  if (!msj) msj = `{uye}, ${randomMsg_integer}`;

  const canvas = Canvas.createCanvas(640, 360);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage(
    "https://cdn.discordapp.com/attachments/835473667567386654/841030335717703700/HOSGELDIN.png" //buraya hg resmini koyabilirsiniz dc linkiyle resim linkini kopyalayın yeni sekmede acın ona gore hg yazısını koyarsınız.
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#74037b";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = `#ffffff`;
  ctx.font = `37px "BornStrong"`;
  ctx.textAlign = "center";
  ctx.fillText(`${member.user.username}`, 300, 342);

  let avatarURL = member.user.displayAvatarURL({
    format: "png",
    dynamic: true,
    size: 1024
  });
  const { body } = await request.get(avatarURL);
  const avatar = await Canvas.loadImage(body);

  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.arc(250 + 55, 55 + 55, 55, 0, 2 * Math.PI, false);
  ctx.clip();
  ctx.drawImage(avatar, 250, 55, 110, 110);

  const attachment = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "hyper-bot-hosgeldin.png"
  );

  canvaskanal.send(attachment);
  canvaskanal.send(
    msj.replace("{uye}", member).replace("{sunucu}", member.guild.name)
  );
  if (member.user.bot)
    return canvaskanal.send(`🤖 Bu bir bot, ${member.user.tag}`);
});
//________________ Resimli HG HB _______________\\

//________________ Sayaç Sistemi _______________\\


client.on("guildMemberAdd", async member => {
  const kanal = await db.fetch(`sayacK_${member.guild.id}`);
  if (!kanal) return;
  const sayaç = await db.fetch(`sayacS_${member.guild.id}`);
  const sonuç = sayaç - member.guild.memberCount;
  const mesaj = await db.fetch(`sayacHG_${member.guild.id}`);
  ///....

  ///....
  if (!mesaj) {
    return client.channels.cache
      .get(kanal)
      .send(`
      <a:GiriGif:848525088223133706> <@${member.user.id}> **Adlı Kullanıcı Aramızda Katıldı.** ${sayaç} **Kişi Olmamıza** ${sonuç} **Kişi Kaldı.** ${member.guild.memberCount} **Kişiyiz!**
          `);
  }

  if (member.guild.memberCount == sayaç) {
    return client.channels
      .get(kanal)
      .send(
        `<a:giris:848525087262113802> **Sayaç Sıfırlandı!** \`${member.guild.memberCount}\` **Kişiyiz!**`
      );
    await db.delete(`sayacK_${member.guild.id}`);
    await db.delete(`sayacS_${member.guild.id}`);
    await db.delete(`sayacHG_${member.guild.id}`);
    await db.delete(`sayacBB_${member.guild.id}`);
  }
  if (mesaj) {
    const mesaj31 = mesaj
      .replace("-uyetag-", `${member.user.tag}`)
      .replace("-server-", `${member.guild.name}`)
      .replace("-uyesayisi-", `${member.guild.memberCount}`)
      .replace(
        "-botsayisi-",
        `${member.guild.members.filter(m => m.user.bot).size}`
      )
      .replace("-bolge-", `${member.guild.region}`)
      .replace("-kanalsayisi-", `${member.guild.channels.size}`)
      .replace("-kalanuye-", `${sonuç}`)
      .replace("-hedefuye-", `${sayaç}`);
    return client.channels.cache.get(kanal).send(mesaj31);
  }
});

client.on("guildMemberRemove", async member => {
  const kanal = await db.fetch(`sayacK_${member.guild.id}`);
  const sayaç = await db.fetch(`sayacS_${member.guild.id}`);
  const sonuç = sayaç - member.guild.memberCount;
  const mesaj = await db.fetch(`sayacBB_${member.guild.id}`);
  if (!kanal) return;
  if (!sayaç) return;
  ///....

  if (!mesaj) {
    return client.channels.cache
      .get(kanal)
      .send(`
      <a:kGif:848525088512933919> <@${member.user.id}> **Adlı Kullanıcı Aramızda Ayrıldı.** ${sayaç} **Kişi Olmamıza** ${sonuç} **Kişi Kaldı.** ${member.guild.memberCount} **Kişiyiz!**
          `);
  }

  if (mesaj) {
    const mesaj31 = mesaj
      .replace("-uye-", `${member.user.tag}`)
      .replace("-server-", `${member.guild.name}`)
      .replace("-uyesayisi-", `${member.guild.memberCount}`)
      .replace(
        "-botsayisi-",
        `${member.guild.members.filter(m => m.user.bot).size}`
      )
      .replace("-bolge-", `${member.guild.region}`)
      .replace("-kanalsayisi-", `${member.guild.channels.cache.size}`)
      .replace("-kalanuye-", `${sonuç}`)
      .replace("-hedefuye-", `${sayaç}`);
    return client.channels.cache.get(kanal).send(mesaj31);
  }
});
//________________ Sayaç Sistemi SON _______________\\

//________________ Oto Tag _______________\\
client.on("guildMemberAdd", async member => {
  let judgedev = await db.fetch(`ototag_${member.guild.id}`) 
  let judgekanal = await db.fetch(`ototagkanal_${member.guild.id}`)
  if(!judgedev || !judgekanal) return
   
   member.setNickname(`${judgedev} ${member.user.username}`)
  
    const ototag = new Discord.MessageEmbed()
      .setTitle(`OTO TAG SİSTEMİ`)
      .setColor("RANDOM")
      .setDescription(`<a:guardtik:848525534177525790> **<@${member.user.id}> Adlı Kullanıcıya \`${judgedev}\` Tag Verildi!**`)
      client.channels.cache.get(judgekanal).send(ototag)

   
  });
//________________ Oto Tag SON _______________\\


//________________ Bot Oto Rol _______________\\
client.on("guildMemberAdd", async member => {
  let kanal = await db.fetch(`otobotkanal_${member.guild.id}`);
   let rol = await db.fetch(`otobotrol_${member.guild.id}`);
  if (!kanal) return;
   if (!rol) return;
   let user = client.users.cache.get(member.id);
   if (member.user.bot) {
 
  client.channels.cache.get(kanal).send(
   new Discord.MessageEmbed()
   .setColor('#1E4EAC')
   .setDescription(`**<a:guardtik:848525534177525790>** Sunucuya **${member.user.tag}** botu katıldı. Başarıyla, <@&${rol}> rolü verildi.`))
   member.roles.add(rol)
 }
   })
//________________ Bot Oto Rol SON _______________\\

client.on('guildMemberAdd',async member => {
  let user = client.users.cache.get(member.id);
  let kanal = client.channels.cache.get(db.fetch(`güvenlik_${member.guild.id}`)) 
       const Canvas = require('canvas')
       const canvas = Canvas.createCanvas(360,100);
       const ctx = canvas.getContext('2d');
  
  const resim1 = await Canvas.loadImage('https://i.hizliresim.com/DWmOSd.png')
    const resim2 = await Canvas.loadImage('https://i.hizliresim.com/hIvMtu.png')
    const kurulus = new Date().getTime() - user.createdAt.getTime();
    const gün = moment(kurulus).format('dddd');  
    var kontrol;
      if (kurulus > 2629800000) kontrol = resim2
    if (kurulus < 2629800000) kontrol = resim1


     const background = await Canvas.loadImage("https://i.hizliresim.com/pprrbj.png");
       ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
   

  const avatar = await Canvas.loadImage(member.user.displayAvatarURL({format: "png"}));
  ctx.drawImage(kontrol,0,0,canvas.width, canvas.height)
  ctx.beginPath();
    ctx.lineWidth = 4;
  ctx.fill()
    ctx.lineWidth = 4;
  ctx.arc(180, 46, 36, 0, 2 * Math.PI);
    ctx.clip();
  ctx.drawImage(avatar, 143,10,73,72);

   if (!kanal) return
       const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'güvenlik.png');
    kanal.send(attachment)
});


client.login(ayarlar.token)

const webhook = new Discord.WebhookClient('859011623125647380','2i34L77zJAbMPiOlkfy9hpTrt2tuSSR8QC4VXMJNd71QUoupqlD-BObdKwYU6Gziglkl');

client.on('guildCreate', async (guild, args) => {
  
let WCS = new Discord.MessageEmbed()
.setColor("GREEN")
.setTitle(`${guild.name} Adlı Sunucusuna Eklendim!`)
.setDescription(`
**__Sunucu Bilgileri__**
Sunucu Adı : \`${guild.name}\`
Sunucu ID : \`${guild.id}\`
Sunucu Bölgesi : **${guild.region}**
Sunucu Üye Sayısı : \`${guild.memberCount}\`
**__Sunucu Sahip Bilgileri__**
Adı : ${client.users.cache.get(guild.ownerID).tag} | IDI : ${guild.owner.id}
`)

webhook.send(WCS);
});

client.on('guildDelete', guild => {
  
let WCS = new Discord.MessageEmbed()
.setColor("RED")
.setTitle(`${guild.name} Adlı Sunucudan Atıldım!`)
.setDescription(`
**__Sunucu Bilgileri__**
Sunucu Adı : \`${guild.name}\`
Sunucu ID : \`${guild.id}\`
Sunucu Bölgesi : **${guild.region}**
Sunucu Üye Sayısı : \`${guild.memberCount}\`
**__Sunucu Sahip Bilgileri__**
Adı : ${client.users.cache.get(guild.ownerID).tag} | IDI : ${guild.owner.id}
`)

webhook.send(WCS);

});

client.on("guildMemberAdd", async member => {


  let kanal = (await db.fetch(`antiraidK_${member.guild.id}`)) == "bot-koruma aç";
  
  if (!kanal) return;
  
  var message = member.guild.owner;
  
  if (member.user.bot === true) {
  if (db.fetch(`botizin_${member.guild.id}.${member.id}`) == "aktif") {
  
  let bot = new Discord.MessageEmbed()
  .setColor("BLUE")
  .setThumbnail(member.user.avatarURL())
  .setDescription(`**${member.user.tag}** (${member.id}) adlı bota bir yetkili izin verdi eğer kaldırmak istiyorsanız **${prefix}bot-izni kaldır BOT İD**.`);
  message.send(bot);
  
  } else {
  
  let izinsizbot = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setThumbnail(member.user.avatarURL())
        .setDescription(`
  Bot Bilgi
  > Bot İsmi : ${member.user.tag} 
  > Bot Etikete : <@${member.id}> 
  Açıklama
  > <@${member.id}> Adlı Bot , \`${member.guild.name}\` Sunucusuna Eklendi ve **Kicklenmiştir**. Eğer İzin Vermek İstiyorsanız \`${prefix}bot-izin ver ${member.id}\` Yazınız
  `);
      member.kick();
      message.send(izinsizbot);
    }
  }
  });

  //-----------------------------------------------------------\\
    