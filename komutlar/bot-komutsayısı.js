const Discord = require('discord.js')

exports.run = async (client, message, args, level) => {
    
    const embed = new Discord.MessageEmbed()
    .setDescription('**\n  <a:mavihype:848529559518314537> Hyper | Toplam**  **`' + client.commands.size + '`** **Komut Vardır!**')
    .setColor("BLUE")
    .setThumbnail('https://i.ibb.co/s2qGRFx/kod.png')
    .setTimestamp()
    .setFooter(`${client.user.username} Bot`, client.user.displayAvatarURL({dynamic: true}))

    return message.channel.send(embed);
    
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'komut-sayısı',
    description: '',
    usage: ''
  };

