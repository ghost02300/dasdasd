const db = require('quick.db');
const Discord = require('discord.js');
const moment = require("moment");
require("moment-duration-format");
exports.run = async(client, message, args) => {
moment.locale('tr');

let region = {
      "us-central": ":flag_us: Amerika",
      "us-east": ":flag_us: Doğu Amerika",
      "us-south": ":flag_us: Güney Amerika",
      "us-west": ":flag_us: Batı Amerika",
      "eu-west": ":flag_eu: Batı Avrupa",
      "eu-central": ":flag_eu: Orta Avrupa",
      europe: ":flag_eu: Avrupa",
      london: ":flag_gb: Londra",
      japan: ":flag_jp: Japonya",
      russia: ":flag_ru: Rusya",
      hongkong: ":flag_hk: Hong Kong",
      brazil: ":flag_br: Brezilya",
      singapore: ":flag_sg: Singapur",
      sydney: ":flag_au: Sidney",
      india: ":flag_in: Hindistan",
      dubai: ":flag_ae: Dubai",
      amsterdam: ":flag_nl: Amsterdam",
      frankfurt: ":flag_de: Frankfurt",
      southafrica: ":flag_za: Güney Afrika"
};
let üyesayı = message.guild.memberCount;
let botsayı = message.guild.members.cache.filter(m => m.user.bot).size;
let toplamüye = üyesayı - botsayı;
let kanalsayı = message.guild.channels.cache.size
let rolsayı = message.guild.roles.cache.size - 1
let emojisayı = message.guild.emojis.cache.size
let afkkanalı = message.guild.afkChannel ? message.guild.afkChannel : "**AFK Kanalı Yok**"

let Emojis = "";
    let EmojisAnimated = "";
    let EmojiCount = 0;
    let Animated = 0;
    let OverallEmojis = 0;
    function Emoji(id) {
      return client.emojis.cache.get(id).toString();
    }
    message.guild.emojis.cache.forEach((emoji) => {
      OverallEmojis++;
      if (emoji.animated) {
        Animated++;
        EmojisAnimated += Emoji(emoji.id);
      } else {
        EmojiCount++;
        Emojis += Emoji(emoji.id);
      }
    });


var aylar = {
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
let ses = message.guild.channels.cache.filter(chan => chan.type === "voice").size
let yazısayı = message.guild.channels.cache.filter(chan => chan.type === "text").size; 
let duyurusayı = message.guild.channels.cache.filter(chan => chan.type === "news").size;
let cotegory = message.guild.channels.cache.filter(chan => chan.type === "category").size

let yetkirolsayı = message.guild.roles.cache.filter(a => a.permissions.has("ADMINISTRATOR") || a.permissions.has("MANAGE_CHANNELS") || a.permissions.has("MANAGE_ROLES") || a.permissions.has("MANAGE_EMOJIS") || a.permissions.has("MANAGE_GUILD") || a.permissions.has("MANAGE_WEBHOOKS")).size
let yetkisiz = rolsayı - yetkirolsayı
const wcs = new Discord.MessageEmbed()
.setColor('AQUA')
.setFooter(`${client.user.username} Sizin için var.`,client.user.avatarURL({ dynamic: true, format: "png", size: 1024 }))
.setThumbnail(message.guild.iconURL({ dynamic: true, format: "png", size: 1024 }))
.setDescription(`**${client.user.username} Bot | Sunucu Bilgi**
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

**Genel Bilgiler;**
> **・Sunucu Sahibi ➔** <@${message.guild.owner.id}>
> **・Sunucu Sahibi ID ➔** \`${message.guild.owner.id}\`
> **・Sunucu ID ➔** \`${message.guild.id}\`
> **・Sunucu Böglesi ➔** **${region[message.guild.region]}**

**Diğer Bilgiler;**
> **・Toplam Üye ➔** \`${message.guild.memberCount}\`
> **・Kullanıcı Sayısı ➔** \`${toplamüye}\`
> **・Bot Sayısı ➔** \`${botsayı}\`
> **・Kanal Sayısı ➔** \`${kanalsayı}\` [Duyuru: **${duyurusayı}** | Yazı: **${yazısayı}** | Ses: **${ses}** Kategori: **${cotegory}**]
> **・Rol Sayısı ➔** \`${rolsayı}\` [Yetkili Rol: **${yetkirolsayı}** | Yetkisiz Rol: **${yetkisiz}**]
> **・Emoji Sayısı ➔** \`${emojisayı}\` [Hareketli: **${Animated}** | Hareketsiz: **${EmojiCount}**]
> **・AFK Kanalı ➔** ${afkkanalı}
> **・AFK Zaman Aşımı ➔** \`${message.guild.afkTimeout}\`

**Ek Bilgiler;**
> **・Sunucu Oluşturulma Tarihi ➔** \`${moment(message.guild.createdAt).format("DD")} ${aylar[moment(message.guild.createdAt).format("MM")]} ${moment(message.guild.createdAt).format("YYYY")}\`
> **・Sunucuya Katılım Tarihi ➔** \`${moment(message.guild.members.cache.get(message.author.id).joinedAt).format("DD")} ${aylar[moment(message.guild.members.cache.get(message.author.id).joinedAt).format("MM")]} ${moment(message.guild.members.cache.get(message.author.id).joinedAt).format("YYYY")}\`
> **・Kısaltması ➔** \`${message.guild.nameAcronym}\`

▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
`)
message.channel.send(wcs)

}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sunucubilgi','sbilgi','sb'],
  permLevel: 0
};

exports.help = {
  name: 'sunucu-bilgi',
  description: 'Sunucunun İstatistik Kavramınızı Bot Tarafından Listeler',
  usage: '{prefix}sbilgi'
};