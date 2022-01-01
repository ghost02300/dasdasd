const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require("moment");

exports.run = async (client, message, args) => {
let davet = new Discord.MessageEmbed()
.setColor("BLUE")
.setThumbnail(`https://cdn.discordapp.com/avatars/833018311763558431/f63a81ec81de35f82dfcb824bb024829.png?size=4096`)
.setDescription("> **Görünen o ki Botumuzu Beğendin Ve Davet Edeceksin.**\n> **`!yardım` Yazarak Daha Detaylı İnceleyebilirsiniz**")
.addField(`BOT Davet`,`[Tıkla!](https://discord.com/oauth2/authorize?client_id=826542677981134859&scope=bot&permissions=8)`,true)
.addField(`Destek Sunucusu`,`[Tıkla!](https://discord.gg/Y5xKvZAnKj)`,true)
.addField(`Oy Ver`,`[Tıkla!](https://top.gg/bot/826542677981134859/vote)`,true)
.setTimestamp()
.setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))
message.channel.send(davet)
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["davetet"],
    permLevel: 0,
}
exports.help = {
    name: 'davet',
    description: 'Sunuzunuzu Tanıtmak İçin En Uygun Kod!',
    usage: 'sunucutanıt'
}
