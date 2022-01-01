const Discord = require('discord.js');
const db = require("quick.db");
var ayarlar = require("../ayarlar.json");
const Canvas = require('canvas')
    , Image = Canvas.Image
    , Font = Canvas.Font
    , path = require('path');
const request = require('node-superfetch');

exports.run = async (client, msg, args) => {
    let Hyper =[
      "%1",
      "%2",
      "%3",
      "%4",
      "%5",
      "%6",
      "%7",
      "%8",
      "%9",
      "%10",
      "%11",
      "%12",
      "%13",
      "%14",
      "%15",
      "%16",
      "%17",
      "%18",
      "%19",
      "%20",
      "%21",
      "%22",
      "%23",
      "%24",
      "%25",
      "%26",
      "%27",
      "%28",
      "%29",
      "%29",
      "%31",
      "%32",
      "%34",
      "%35",
      "%36",
      "%37",
      "%38",
      "%39",
      "%40",
      "%41",
      "%42",
      "%43",
      "%55",
      "%57",
      "%59",
      "%60",
      "%62",
      "%63",
      "%64",
      "%65",
      "%66",
      "%69",
      "%70",
      "%74",
      "%75",
      "%76",
      "%77",
      "%79",
      "%80",
      "%81",
      "%82",
      "%83",
      "%0",
      "%95",
      "%99",
      "%100",
    ]
let sayı = Hyper[Math.floor(Math.random() * Hyper.length)]


let user = msg.mentions.users.first() || msg.guild.members.cache.get(args[0])
if(!user) return msg.channel.send(`\`${msg.author.tag}\` **Kullanıcı Belirt** 😉`)
  
            const { createCanvas, loadImage } = require("canvas");
            const canvas = createCanvas(1234, 537);
            const ctx = canvas.getContext("2d");

            const background = await Canvas.loadImage("https://cdn.discordapp.com/attachments/817486872044634133/820255247208284160/20210227_160109.png");
            ctx.drawImage(background , 0 ,0 , canvas.width , canvas.height);
            const avatar2 = await Canvas.loadImage(msg.author.avatarURL({ dynamic: true, format: "png", size: 1024 }))
            const avatar = await Canvas.loadImage(user.avatarURL({ dynamic: true, format: "png", size: 1024 }))
          
            ctx.strokeStyle = "#E4E0E4";
            ctx.strokeRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(avatar , 832 , 127 , 275 , 275)

            ctx.fillStyle = `#D3D3D3`;
            ctx.font = `97px "Warsaw"`;
            ctx.textAlign = "center";
            ctx.fillText(`${sayı}`, 620, 280);
  
            ctx.strokeStyle = "#E4E0E4";
            ctx.strokeRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(avatar2 , 113 , 127 , 275 , 275)
  
  


const attachment = new Discord.MessageAttachment(canvas.toBuffer(),'AşkÖlçer.png')
  msg.channel.send(attachment)
  
  
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["aşk"],
  permLevel: 0
};
exports.help = {
  name: "aşk-ölçer",
  description: ".",
  usage: ""
};