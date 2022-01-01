const Discord = require('discord.js');
const data = require('quick.db');


exports.run = async (client, message, args) => {
if(message.author.id !== message.guild.owner.user.id) return message.channel.send(new Discord.MessageEmbed().setThumbnail(message.author.avatarURL() ? message.author.avatarURL({dynamic: true}) : 'https://cdn.glitch.com/8e70d198-9ddc-40aa-b0c6-ccb4573f14a4%2F6499d2f1c46b106eed1e25892568aa55.png').setImage('https://cdn.glitch.com/0c8ef551-5187-48a8-9daf-f2cc35630f21%2Fyoneticigif.gif').setTitle('Bir hata oldu!').setDescription(`• \`${client.ayarlar.prefix}sunucu-kur\` **kullanmak için,** \`Sunucu Sahibi\` **olmanız gerekiyor.**`).addField('Sunucu Sahibi', message.guild.owner.user.tag).setImage('https://cdn.glitch.com/6f5bb25b-c11b-4003-8a39-69490341df18%2FScreenshot_1.png'));

message.channel.send(new Discord.MessageEmbed()
.setTitle('Public')
.setThumbnail('https://cdn.discordapp.com/avatars/686185592899633200/6499d2f1c46b106eed1e25892568aa55.webp?size=512')
.setFooter(`Ping: ${client.ws.ping.toFixed(0)}`, client.user.avatarURL({dynamic: true}))
.setDescription(`${message.author} **Sunucunun** kurulmasını onaylıyor musun? 😇

**Dipnot:** Bazı kanllar silinmemiş gibi görünebilir. Discord dan çıkıp girin düzelir.`)).then(resulter => {
resulter.react('✅').then(() => resulter.react('❌'));

const yesFilter = (reaction, user) => { return reaction.emoji.name === '✅' && user.id === message.guild.owner.user.id; };
const yes = resulter.createReactionCollector(yesFilter, { time: 0 });
const noFilter = (reaction, user) => { return reaction.emoji.name === '❌' && user.id === message.guild.owner.user.id; };
const no = resulter.createReactionCollector(noFilter, { time: 0 });

yes.on('collect', async reaction => {
message.guild.roles.cache.filter(a => !a.managed && a.name !== '@everyone' && a.position < message.guild.members.cache.get(client.user.id).roles.highest.position).forEach(role => role.delete('ok boomer') && console.log(role.name+' silindi sqrt'));
message.guild.channels.cache.forEach(a => a.delete());

message.guild.roles.create({ data: { name: '👑' }, reason: 'ayn' }).then(role => {
role.setPermissions(['ADMINISTRATOR']);
role.setColor('#E0FF00');
});
message.guild.roles.create({ data: { name: '🌈・Yönetim Ekibi' }, reason: 'ayn' }).then(role => {
role.setPermissions(['MANAGE_GUILD', 'MANAGE_ROLES', 'KICK_MEMBERS', 'MANAGE_NICKNAMES', 'MANAGE_MESSAGES', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS']);
role.setColor('#FF0000');
});
message.guild.roles.create({ data: { name: '🌈・Yönetici' } , reason: 'ayn'}).then(role => {
role.setPermissions(['MANAGE_GUILD', 'MANAGE_ROLES', 'MANAGE_NICKNAMES', 'MANAGE_MESSAGES', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS']);
role.setColor('#FF0000');
});
message.guild.roles.create({ data: { name: '❄️・Admin' }, reason: 'ayn' }).then(s => s.setColor('#00B2FF'))
message.guild.roles.create({ data: { name: '🎫・İzin Kartı' }, reason: 'ayn' }).then(s => s.setColor('#00B2FF'))
message.guild.roles.create({ data: { name: '🔱・Moderatör' }, reason: 'ayn' }).then(s => s.setColor('#FBFF00'))
message.guild.roles.create({ data: { name: '♨️・Partner Sorumlusu' }, reason: 'ayn' }).then(s => s.setColor('#FF2A00'))
message.guild.roles.create({ data: { name: '✔️・Teyit Görevlisi' }, reason: 'ayn' }).then(s => s.setColor('#27FF00'))
message.guild.roles.create({ data: { name: '▬▬▬▬▬▬▬▬' }, reason: 'ayn' }).then(s => s.setColor('#FFFFFF'))
message.guild.roles.create({ data: { name: '🌟・V.İ.P' }, reason: 'ayn' }).then(s => s.setColor('#FFFB00'))
message.guild.roles.create({ data: { name: '♂️・Erkek' }, reason: 'ayn' }).then(s => s.setColor('#0097FF'))
message.guild.roles.create({ data: { name: '♀・Kadın' }, reason: 'ayn' }).then(s => s.setColor('#E800FF'))
message.guild.roles.create({ data: { name: 'Üye' }, reason: 'ayn' }).then(s => s.setColor('#00FFAE'))
message.guild.roles.create({ data: { name: '💛・Gold Heart' }, reason: 'ayn' }).then(s => s.setColor('#E4FF00'))
message.guild.roles.create({ data: { name: '☢️・Gececi' }, reason: 'ayn' }).then(s => s.setColor('#D100FF'))
message.guild.roles.create({ data: { name: '🚬・YIKIK' }, reason: 'ayn' }).then(s => s.setColor('#000000'))
message.guild.roles.create({ data: { name: '▬▬▬▬▬▬▬▬' }, reason: 'ayn' }).then(s => s.setColor('#FFFFFF'))
message.guild.roles.create({ data: { name: '🎮・Fortnite' }, reason: 'ayn' }).then(s => s.setColor('#03ff00'))
message.guild.roles.create({ data: { name: '🎮・GTA 5 ' }, reason: 'ayn' }).then(s => s.setColor('#03ff00'))
message.guild.roles.create({ data: { name: '🎮・League of Legends' }, reason: 'ayn' }).then(s => s.setColor('#03ff00'))
message.guild.roles.create({ data: { name: '🎮・Pubg' }, reason: 'ayn' }).then(s => s.setColor('#03ff00'))
message.guild.roles.create({ data: { name: '🎮・Valorant' }, reason: 'ayn' }).then(s => s.setColor('#03ff00'))
message.guild.roles.create({ data: { name: '🎮・Among Us' }, reason: 'ayn' }).then(s => s.setColor('#03ff00'))
message.guild.roles.create({ data: { name: '▬▬▬▬▬▬▬▬' }, reason: 'ayn' }).then(s => s.setColor('#FFFFFF'))
message.guild.roles.create({ data: { name: 'Kayıtsız Üye' }, reason: 'ayn' }).then(s => s.setColor('#FFFFFF'))

message.guild.channels.create('Silivri', {type: 'category'}).then(parent => {
message.guild.channels.create('👤・kayıt', {type: 'text'}).then(c => c.setParent(parent.id));
message.guild.channels.create('🎀・hoşgeldin', {type: 'text'}).then(c => c.setParent(parent.id));
message.guild.channels.create('👤・Ses Teyit', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(31));
});


message.guild.channels.create('▬▬▬ Yer Altı Mağrası ▬▬▬', {type: 'category'}).then(parent => {
message.guild.channels.create('🔰・yetkili-sohbet', {type: 'text'}).then(c => c.setParent(parent.id));
message.guild.channels.create('🔰・Yetkili-duyuru ', {type: 'text'}).then(c => c.setParent(parent.id));
message.guild.channels.create('🏳・partner-text', {type: 'text'}).then(c => c.setParent(parent.id));
message.guild.channels.create('📛・görevler', {type: 'text'}).then(c => c.setParent(parent.id));
});

message.guild.channels.create('▬▬▬ Bilgilendirme ▬▬▬▬', {type: 'category'}).then(parent => {
message.guild.channels.create('📣・duyurular', {type: 'text'}).then(c => c.setParent(parent.id));
message.guild.channels.create('📫・kurallar', {type: 'text'}).then(c => c.setParent(parent.id));
message.guild.channels.create('🎉・çekiliş', {type: 'text'}).then(c => c.setParent(parent.id));
message.guild.channels.create('🚀・booster', {type: 'text'}).then(c => c.setParent(parent.id));
});


message.guild.channels.create('▬▬▬ Genel Kanallar ▬▬▬▬', {type: 'category'}).then(parent => {
message.guild.channels.create('💬・sohbet', {type: 'text'}).then(c => c.setParent(parent.id));
message.guild.channels.create('🤖・bot-komut', {type: 'text'}).then(c => c.setParent(parent.id));
message.guild.channels.create('📷・görseller', {type: 'text'}).then(c => c.setParent(parent.id));
message.guild.channels.create('🌌・gif', {type: 'text'}).then(c => c.setParent(parent.id));
});

message.guild.channels.create('▬▬▬▬▬ ROL ALMA ▬▬▬▬▬', {type: 'category'}).then(parent => {
message.guild.channels.create('🎮・oyun-seç', {type: 'text'}).then(c => c.setParent(parent.id));
message.guild.channels.create('🔮・burç-seç', {type: 'text'}).then(c => c.setParent(parent.id));
message.guild.channels.create('💝・ilişki-seç', {type: 'text'}).then(c => c.setParent(parent.id));
message.guild.channels.create('🌐・partner-görme', {type: 'text'}).then(c => c.setParent(parent.id));
});

message.guild.channels.create('▬▬▬ Oyun Kanalları ▬▬▬▬', {type: 'category'}).then(parent => {
message.guild.channels.create('✒️・kelime-türetmece', {type: 'text'}).then(c => c.setParent(parent.id));
message.guild.channels.create('💢・sayı-sayma', {type: 'text'}).then(c => c.setParent(parent.id));
});

message.guild.channels.create('Public Ses Kanalları', {type: 'category'}).then(parent => {
message.guild.channels.create('💭・Sohbet Odası #1', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(10));
message.guild.channels.create('💭・Sohbet Odası #2', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(15));
message.guild.channels.create('💭・Sohbet Odası #3', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(20));
message.guild.channels.create('💭・Sohbet Odası #4', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(99));
message.guild.channels.create('🎧・Müzik Odası #1', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(15));
message.guild.channels.create('🎧・Müzik Odası #2', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(12));
message.guild.channels.create('🎤・Müzik Odası #3', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(12));
});

message.guild.channels.create('Özel Odalar', {type: 'category'}).then(parent => {
message.guild.channels.create('🔇・Tek Kişilik', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(1));
message.guild.channels.create('🔇・Tek Kişilik', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(1));
message.guild.channels.create('🔇・Tek Kişilik', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(1));
message.guild.channels.create('🔇・Tek Kişilik', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(1));
message.guild.channels.create('🔈・2 Kişilik', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(2));
message.guild.channels.create('🔈・2 Kişilik', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(2));
message.guild.channels.create('🔉・3 Kişilik', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(3));
message.guild.channels.create('🔉・3 Kişilik', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(3));
message.guild.channels.create('🔉・3 Kişilik', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(3));
message.guild.channels.create('🔊・4 Kişilik', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(4));
message.guild.channels.create('🔊・4 Kişilik', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(4));
message.guild.channels.create('🔔・5 Kişilik', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(5));
message.guild.channels.create('🔔・5 Kişilik', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(5));
});

message.guild.channels.create('💤・AFK', {type: 'category'}).then(parent => {
message.guild.channels.create('💤・AFK', {type: 'voice'}).then(a => a.setParent(parent.id) && a.setUserLimit(31));
});
});

no.on('collect', async reaction => {
resulter.delete();
});

})


};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['atlantis'],
  permLevel: 0
}

exports.help = {
  name: 'sunucukur-public'
};