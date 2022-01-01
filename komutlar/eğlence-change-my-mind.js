const Discord = require("discord.js");
const { get } = require("superagent");
module.exports.run = async (bot, message, args) => {
    try {
        if(!args[0]){
message.channel.send('Bir yazı giriniz.\nNot : `Eğer türkçe harf kullanırsanız komut çalışmayabilir.`')
return;
}
        let url = `https://nekobot.xyz/api/imagegen?type=changemymind&text=${args.join(" ")}`
        get(url).then(res => {
            const pixelien = new Discord.MessageEmbed()
            .setColor("0x36393E")
            .setAuthor("Fikrimi söylüyorum..")
            .setImage(res.body.message)
            setTimeout(() => {
                return message.channel.send(pixelien);
            }, 100);
        });
    } catch(err) {
        console.log(err)    
    }
}
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["changemymind"],
  permLevel: 0
};

module.exports.help = {
  name: 'change-my-mind',
  category: 'Kullanıcı',
  description: 'Change my mind',
  usage: 'change-my-mind <yazı>'
};