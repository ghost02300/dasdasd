const db = require("quick.db");
const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {

let prefix = await db.fetch(`prefix_${message.guild.id}`);
if (prefix == null) prefix = ayarlar.prefix;
  
if (!message.member.hasPermission("MANAGE_CHANNELS")) {
const wcs = new Discord.MessageEmbed()
.setColor('AQUA')
.setDescription(`• \`${prefix}nuke\` Kullanabilmek için , \`Kanalları Yönet\` **Yetkisine sahip olmanız gerekir**.`)
message.channel.send(wcs);
 return;
}
const onayembed = new Discord.MessageEmbed()
.setColor('AQUA')
.setDescription(`\`${message.author.username}\`, **Nuke İşlemini __Onaylamak__ İçin \`✅\` Emojisine Tıklayınız !**`)
message.channel.send(onayembed).then(msg => {
msg.react('✅').then(() => msg.react('⛔'));

const filter = (reaction, user) => {
	return ['✅', '⛔'].includes(reaction.emoji.name) && user.id === message.author.id; //reaction.emoji.name bu kodu reaction.emoji.id yaparsınız ID ile emoji girebilirsiniz
};

msg.awaitReactions(filter, { max: 1, time: 30000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '✅') {
      message.channel.clone({position: message.channel.position});
      message.channel.delete();
		} else {
			message.channel.send('**Nuke İşlemi İptal Edildi !**').then(msg => msg.delete({ timeout: 3000 }))
      msg.delete( { timeout:3000 } )
		}
	})
	.catch(collected => {
		message.channel.send('**Bilinmeyen bir hata meydana geldi !**').then(msg => msg.delete({ timeout: 4000 }))
	});
})
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['patlat','boom'],
  permLevel: 0
};
exports.help = { 
	name: 'nuke', 
  description: "Bot bulunduğunuz kanalı siler ve yeniden oluşturur.",
  usage: 'nuke'
};