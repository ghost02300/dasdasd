const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {
    let nemesis = await db.fetch(`premod_${message.guild.id}`)
  let nemesisYazi;
  if (nemesis == null) nemesisYazi = "<a:cikis:848525086184570891> Bu sunucuda premium mod `Aktif değil`."
  if (nemesis == 'aktif') nemesisYazi = "<a:giris:848525087262113802> Bu sunucu için premium mod `Aktif`."
  if (nemesis == 'deaktif') nemesisYazi = "<a:cikis:848525086184570891> Bu sunucuda premium mod `aktif değil`."
  const embed = new Discord.MessageEmbed()
  .setTitle('Hyper - Premium Kontrol')
  .setColor("BLUE")
  .setDescription(nemesisYazi)
  message.channel.send(embed)
  }

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["premiumkontrol"],
    permLevel: 0,
}

exports.help = {
    name: 'premium-kontrol',
    description: 'Premium Kontrol Eder.',
    usage: 'premium-kontorol'
}