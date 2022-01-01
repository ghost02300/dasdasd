// * Modules
const Discord = require('discord.js');
const db = require("quick.db");
// * Command
exports.run = (client, message, args) => {
    // ? kullanımı ==> <prefix>poll başlık / şık1, şık2, şık3, şık4, şık5 .... şık10
    // ! başlıktan sonra / koyun ardından şıkları virgül ile ayırarak yazın. max 10 şık koyabilirsiniz.
    // ! örnek kullanım: !poll Gaziantep FK vs Beşiktaş / Gaziantep FK, Berabere, Beşiktaş

    if (!db.has(`premod_${message.guild.id}`) == true) {
    
        const westrabumbeyyy = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription("**<a:cikis:848525086184570891> Bu sunucuda `Premium Mod Aktif Değil` Bu yüzden bu komutu kullanamazsınız. __Premium Hakkında Bilgi Almak Tıkla__ : [↗️](https://discord.gg/Y5xKvZAnKj)**")
        return message.channel.send(westrabumbeyyy)
    
      
    } else {

    const laura = (abcdef) => {
        message.channel.send(new Discord.MessageEmbed().setTitle('Bir hata oluştu!').setDescription(abcdef).setColor('RED'));
    };

    if (!message.member.hasPermission('MANAGE_MESSAGES')) return laura('Bu komudu kullanabilmek için **MESAJLARI YÖNET** yetkinin olması gerekiyor.')
    try {
        const soulcastle = args.join(' ').split('/')
        const youthanasia = soulcastle[0].trim();
        if (!youthanasia) return laura('Komudu yanlış kullanmış olabilirsiniz, doğru kullanımı: \n\n`!gelişmiş-oylama [başlık] / (şık1), (şık2), (şık3)`\n* ***Başlıktan sonra / koyun ve şıkları virgül ile ayırın.***');
        const lauraa = soulcastle[1].trim().split(',');
        const lauraaa = lauraa.length;
        if (lauraaa > 10) return laura('Maksimum 10 adet şık koyabilirsiniz.');
        if (lauraa.includes(' ')) return laura('Boş bir şık koyamazsınız.')
        
        const pollEmbed = new Discord.MessageEmbed().setTitle('Lütfen bekleyiniz ayarlamalar yapılıyor..');
        const emojies = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];
        message.channel.send(pollEmbed).then(async pollMsg => {
            for (let lauraaaa = 0; lauraaaa < lauraaa; lauraaaa++) {
                pollMsg.react(emojies[lauraaaa]);
                pollEmbed.addField(`${emojies[lauraaaa]} ${lauraa[lauraaaa].trim()}`, `\u200B`, true);
            };
            
            await pollMsg.edit(pollEmbed.setTitle(youthanasia).setColor("BLUE").setFooter('Seçeneğin emojisine tıklayarak oylamaya katılabilirsiniz.'));
        });
    } catch(err) {
        laura('Komudu yanlış kullanmış olabilirsiniz, doğru kullanımı: \n\n`!gelişmiş-oylama [başlık] / (şık1), (şık2), (şık3)`\n* ***Başlıktan sonra / koyun ve şıkları virgül ile ayırın.***');
    }
};

}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['preoylama'],
  permLevel: 0
};

exports.help = {
  name: "premium-oylama"
};
