const CodeWordk_Canva = require("canvacord");
const { MessageAttachment } = require("discord.js");

exports.run = async (client, message, args) => {
    let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
    let triggered = await CodeWordk_Canva.Canvas.wanted(user.displayAvatarURL({ format: "png", dynamic: false }));
    let attachment = new MessageAttachment(triggered, "wanted.png");
    return message.channel.send(new MessageAttachment(triggered, "wanted.png"))
}

exports.conf = {
    enabled: true,
    aliases: [],
};

exports.help = {
    name: 'wanted',
};