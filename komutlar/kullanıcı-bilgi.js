const db = require('quick.db');
const Discord = require('discord.js');
const moment = require("moment");
require("moment-duration-format");
exports.run = async(client, message, args) => {
moment.locale('tr')
let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author

let mentionMember = message.guild.members.cache.get(user.id);

let nick = mentionMember.nickname || `[Bulunmuyor]`

const member = message.guild.member(user);
  
let mention = client.users.cache.get(member.id);


const members = message.guild.members.cache
.sort((a, b) => a.joinedTimestamp - b.joinedTimestamp)
.array();

let position = new Promise((ful) => {
  for (let i = 1; i < members.length + 1; i++) {
if (members[i - 1].id === mention.id) ful(i);
}
})

let rozetler = false;
if(mention.flags.toArray().length <= 0) {
rozetler = false;
} else {
rozetler = true;
};

let mentionFlags = mention.flags.toArray().join(' | ')
.replace('HOUSE_BRAVERY', '**__HypeSquad Bravery__**')  
.replace('HOUSE_BRILLIANCE', '**__HypeSquad Brilliance__**')
.replace('HOUSE_BALANCE', '**__HypeSquad Balance__**')
.replace('VERIFIED_DEVELOPER', '**__Onaylı Geliştirici__**')
.replace('DISCORD_EMPLOYEE', '**__Discord Çalışanı__**')
.replace('PARTNERED_SERVER_OWNER', '**__Partner__**')
.replace('HYPESQUAD_EVENTS', '**__Hype Squad Etkinlikleri__**')
.replace('BUGHUNTER_LEVEL_1', '**__Hata Avcısı 1__**')
.replace('EARLY_SUPPORTER', '**__Erken Dönem Destekçisi__**')
.replace('TEAM_USER', '**__Takım Üyesi__**')
.replace('SYSTEM', '**__Sistem__**')
.replace('BUGHUNTER_LEVEL_2', '**__Hata Avcısı 2__**')
.replace('VERIFIED_BOT', '**__Onaylı Bot__**');

let oyunlar = [];
mention.presence.activities.forEach(slm => {
if(slm.type === 'CUSTOM_STATUS') {
oyunlar.push(`${slm.emoji ? slm.emoji : ''} ${slm.state}`);
} else {
oyunlar.push(`**${slm.name}** ${slm.type.replace('PLAYING', 'oynuyor').replace('STREAMING', 'yayınlıyor').replace('LISTENING', 'dinliyor').replace('WATCHING', 'izliyor')}`)
}});
  
let slm = {
  web: ':globe_with_meridians: \`Tarayıcı\`',
  desktop: '💻 \`Masaüstü\`',
  mobile: '📱 \`Mobil\`'
}

let sa;
if(mention.bot) {
sa = 'Bilinmiyor.'
} else {
sa = slm[Object.keys(mention.presence.clientStatus)[0]];
};

let durum = mention.presence.status.replace('online', '🟢 Çevrimiçi').replace('idle', '🟠 Boşta').replace('dnd', '🔴 Rahatsız Etmeyin').replace('offline', '⚪ Çevrimdışı')

 const kurulus = new Date().getTime() - user.createdAt.getTime();
    var kontrol;    const gün = moment.duration(kurulus).format("D")   

    if (kurulus < 1296000000) kontrol = '\`⛔ Güvenli Değil\`'
    if (kurulus > 1296000000) kontrol = '\`✅ Güvenli\`'

  let userinfo = {};
 userinfo.dctarih = moment
    .utc(message.guild.members.cache.get(user.id).user.createdAt)
    .format("DD/MM/YYYY - HH:mm:ss")

 userinfo.dctarihkatilma = moment
    .utc(message.guild.members.cache.get(user.id).joinedAt)
    .format("DD/MM/YYYY - HH:mm:ss")

const hyper = new Discord.MessageEmbed()
.setColor('AQUA')
.setFooter(`${client.user.username} Sizin için var.`,client.user.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setThumbnail(user.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setDescription(`**${client.user.username} Bot | Kullanıcı Bilgi**
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

**Kullanıcı Bilgisi;**

> **・ID ➔** \`${user.id}\` **・Avatar ➔** [\`PNG\`](${user.avatarURL({ dynamic: true, format: "png", size: 1024 })}) [\`JPEG\`](${user.avatarURL({ dynamic: true, format: "jpeg", size: 1024 })}) [\`WEBP\`](${user.avatarURL({ dynamic: true, format: "webp", size: 1024 })}) [\`GİF\`](${user.avatarURL({ dynamic: true, format: "gif", size: 1024 })})
> **・Profil ➔** \`${user.tag}\` (<@${user.id}>)
> **・Durumu ➔** ${durum} **・İşletim Sistemi ➔** ${sa}

**Üyelik Bilgisi;**

> **・Takma Adı ➔** \`${nick || '[Bulunmuyor]'}\` **・Güvenlimi ➔** ${kontrol}
> **・Katılım Sırası ➔** \`${await position}/${message.guild.memberCount}\` **・Son Mesaj ➔** \`${message.author.lastMessage}\`

**Rol-Yetki Bilgisi;**

> **・En Yüksek Rolü ➔** ${member.roles.highest || '\`[Bulunmuyor]\`'} --> HEX(${member.roles.highest.hexColor || '\`[Bulunmuyor]\`'})

**Teyit Bilgileri;**

> **・Discorda Kayıt Tarihi ➔** \`${userinfo.dctarih}\`
> **・Sunucuya Giriş Tarihi ➔** \`${userinfo.dctarihkatilma}\`

**Rozet Bilgileri;**
> ${rozetler ? mentionFlags : `\`[Bulunmuyor]\``}
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`)
message.channel.send(hyper)

}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kb','kbilgi','kullanıcıbilgi'],
  permLevel: 0
};
exports.help = {
  name: 'kullanıcı-bilgi',
  description: 'Kullanıcı Bilginizi Bot Tarafından Listeler',
  usage: '{prefix}kbilgi <user>'
};
