const { MessageEmbed } = require('discord.js');
const moment = require("moment");
const permler = {
    "ADMINISTRATOR": "Yönetici",
    "CREATE_INSTANT_INVITE": "Davet Oluştur",
    "KICK_MEMBERS": "Üyeleri At",
    "BAN_MEMBERS": "Üyeleri Yasakla",
    "MANAGE_CHANNELS": "Kanalları Yönet",
    "MANAGE_GUILD": "Sunucuyu Yönet",
    "ADD_REACTIONS": "Tepki Ekle",
    "VIEW_AUDIT_LOG": "Denetim Kaydını Görüntüle",
    "PRIORITY_SPEAKER": "Öncelikli Konuşmacı",
    "STREAM": "Yayın Aç",
    "VIEW_CHANNEL": "Kanalları Gör",
    "SEND_MESSAGES": "Mesaj Gönder",
    "SEND_TTS_MESSAGES": "Metin Okuma Mesajı Gönder",
    "MANAGE_MESSAGES": "Mesajları Yönet",
    "EMBED_LINKS": "Bağlantı Yerleştir",
    "ATTACH_FILES": "Dosya Ekle",
    "READ_MESSAGE_HISTORY": "Mesaj Geçmişini Oku",
    "MENTION_EVERYONE": "@everyone, @here ve Tüm Rollerden Bahset",
    "USE_EXTERNAL_EMOJIS": "Harici Emojiler Kullan",
    "VIEW_GUILD_INSIGHTS": "Sunucu Bilgilerini Görüntüle",
    "CONNECT": "Bağlan",
    "SPEAK": "Konuş",
    "MUTE_MEMBERS": "Üyeleri Sustur",
    "DEAFEN_MEMBERS": "Üyeleri Sağırlaştır",
    "MOVE_MEMBERS": "Üyeleri Taşı",
    "USE_VAD": "Ses Eylemini Kullan",
    "CHANGE_NICKNAME": "Kullanıcı Adı Değiştir",
    "MANAGE_NICKNAMES": "Kullanıcı Adlarını Yönet",
    "MANAGE_ROLES": "Rolleri Yönet",
    "MANAGE_WEBHOOKS": "Webhook'ları Yönet",
    "MANAGE_EMOJIS": "Emojileri Yönet"
  };
exports.run = async (bot, message, args) => {
    let role = message.mentions.roles.first() || args[0];
    if (!role) return message.channel.send(new { MessageEmbed }.MessageEmbed().setDescription(':pencil: **Bir Rol Etiketlemelisin!**').setColor("1b1b1f"));
    try {
    let asıl = message.guild.roles.cache.get(role.id || role);
    let hex = asıl.hexColor.toString().slice(1)
    let izinler = asıl.permissions.toArray().slice(0, 8).map((r, index) => `\`${index + 1}.\` ${permler[r]}`).join('\n')
    let izinler2 = asıl.permissions.toArray().map((r, index) => `\`${index + 1}.\` ${permler[r]}`).join('\n')
    let izin = asıl.permissions.toArray().includes('ADMINISTRATOR') ? `:star: Yönetici :star:\n╰> Yönetici yetkisi olduğu için diğer ${asıl.permissions.toArray().length - 1} yetki sıralanmadı.` : asıl.permissions.toArray().length > 9 ? izinler + `\n╰> ${asıl.permissions.toArray().length - 8} Adet fazladan yetki bulunmaktadır.` : izinler2
    let rolüyeler = asıl.members.size < 9 ? asıl.members.array().map((r, index) => `\`${index + 1}.\` ${r}`).join('\n') : asıl.members.array().slice(0, 8).map((r, index) => `\`${index + 1}.\` ${r}`).join('\n') + `\n╰> ${asıl.members.size - 8} Kişide daha bulunmaktadır.`
    let embed = new MessageEmbed()
    .setTitle(`__${role.name}__ Adlı Rol`)
    .setThumbnail(`http://colorhexa.com/${hex}.png`)
    .setColor(asıl.hexColor)
    .addField(`:pencil: Rol Bilgileri`,`:id: **ID:** ${asıl.id}\n:speech_balloon: **Adı:** ${asıl.name}\n:art: **Renk Kodu:** ${asıl.hexColor.toUpperCase()}\n:page_facing_up: **Sıralaması:** ${asıl.rawPosition ? asıl.rawPosition : '1'}/${message.guild ? message.guild.roles.cache.size : '1'}\n:label: **Etiketlenebilir:** ${asıl.mentionable ? 'Evet' : 'Hayır'} \n:calendar_spiral: **Rol Kurulma Tarihi:** ${moment(role.createdAt).format("DD/MM/YYYY")}`)
    .addField(`:bust_in_silhouette: Role Sahip Kullanıcılar (${asıl.members.size})`, `${!rolüyeler ? 'Bu role sahip kimse bulunmuyor.' : rolüyeler}`)
    .addField(`:key: Rol Yetkileri (${asıl.permissions.toArray().length})`, `${!izin ? 'Bulunamadı.' : izin}`)
    
    message.channel.send(embed)
    } catch(e) {
        message.channel.send(new { MessageEmbed }.MessageEmbed().setDescription(':warning: **Rol bulunamadı lütfen girdiğiniz bilgilerin doğru olduğundan emin olunuz.**').setColor("1b1b1f"));
    }
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'rol-bilgi',
    description: '',
    usage: ''
  };