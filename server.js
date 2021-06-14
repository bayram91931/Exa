var dbd = require("dbd.js");
var fs = require("fs");
var bot = new dbd.Bot({
  token: process.env.TOKEN,
  prefix: ".",
  mobile: false
});
bot.onMessage();
var reader = fs.readdirSync("./komutlar/").filter(file => file.endsWith(".js"));
for (const file of reader) {
  const command = require(`./komutlar/${file}`);
  bot.command({
    name: command.name,
    code: command.code
  });
}
bot.variables({
  prefix: "."
});

// BAN KOMUT?
bot.command({
  name: "ban",
  code: `$reactionCollector[$splitText[1];$authorID;1m;✅,❌;bevet,bhayır;yes]
$textSplit[$sendMessage[{title:**Ban!**}{footer:$username#$discriminator İstedi:$authorAvatar}{description:
**<@$mentioned[1]>** adlı kullanıcıyı banlamak istediğine emin misin??
$argsCheck[>1;Kimi banlamam gerek?]
$onlyIf[$hasPerms[$authorID;admin]!=false;Yeterince yetkin bulunmamakta!]

} {color:000046};yes]; ]`
});
bot.awaitedCommand({
  name: "bevet",
  code: `
 $ban[$mentioned[1]]
 $editMessage[$message[1];{author:$username:$authorAvatar} {description:**<@$mentioned[1]>** adlı kullanıcıyı banladım} {color:000046} {footer:Developed By 8ay 21}
]
 `
});
bot.awaitedCommand({
  name: "bhayır",
  code: `
 $editMessage[$message[1];{author:$username:$authorAvatar} {description:**<@$mentioned[1]>** adlı kullanıcıyı banlama işlemi iptal edildi} {color:000046} {footer:Developed By 8ay 21}
]
 `
});

// BAN KOMUT
// KAYIT

bot.command({
  name: "kayıt",
  code: `$reactionCollector[$splitText[1];$authorID;1m;♀,♂;kkadın,kerkek;yes]
$textSplit[$sendMessage[{title:**EXA**}{footer:$username#$discriminator:$authorAvatar}{description:
**<@$mentioned[1]>** adlı kullanıcıyı kayıt etmek için alttaki emojilerden birine tıkla
$argsCheck[>1;Kimi kayıt etmem gerek?]
$onlyIf[$hasRoles[$authorID;851797507297640459]!=false;Bu komudu kullanabilmek için yeterli yetkiye sahip değilsin!]

} {color:6495ed};yes]; ]`
});
  name: "kkadın",
  code: `
  $takeRole[$mentioned[1];851801396844167229]
 $giveRoles[$mentioned[1];851798107636105226]
 $editMessage[$message[1];{author:$username:$authorAvatar} {description:**<@$mentioned[1]>** adlı kullanıcıyı kız üye olarak kayıt ettim} {color:6495ed} {footer:Developed By 8ay 21}
]
 `
});
bot.awaitedCommand({
  name: "kerkek",
  code: `
  $takeRole[$mentioned[1];851801396844167229]
  $giveRoles[$mentioned[1];851797507297640461]
 $editMessage[$message[1];{author:$username:$authorAvatar} {description:**<@$mentioned[1]>** adlı kullanıcıyı erkek üye olarak kayıt ettim} {color:6495ed} {footer:Developed By 8ay 21}
]
 `
});

// KAYIT

// MESAJ LOGS

bot.updateCommand({
        channel: "851812481625489419", 
        code: `
        $author[$username[$authorID] Mesaj düzenledi !;$authorAvatar]
$description[$thumbnail[$serverIcon]
Önceki Mesaj : \`\$oldMessage\`\

Güncel mesaj : \`\$message\`\

Mesajın Editlendiği Kanal : <#$channelUsed>

Editleyen kişi : $username]
 $onlyIf[$isBot[$authorID]!=true;]`
})
bot.onMessageUpdate()

bot.deletedCommand({
channel:"851812481625489419",
code:`
$author[$username[$authorID] Mesaj Sildi !;$authorAvatar]
$description[$thumbnail[$serverIcon]
Silinen mesaj : $message

Mesajın silindiği kanal : <#$channelUsed>

Silen kullanıcı : $username]
$onlyIf[$isBot[$authorID]!=true;]
`
})
bot.onMessageDelete()
bot.command({
  name: "ayarlarank",
  usage: "setrank <channel>",
  description: "settings the levelup channel",
  code: `$description[Level kanalı olarak  <#$mentionedChannels[1;yes]> ayarlandı]
$color[01ff00]
$setServerVar[rch;$mentionedChannels[1;yes]]
$setServerVar[rsystem;1]
$onlyPerms[admin;{description:\`Admin\` yetkin olmalı!}{color:ff2050}]
`
});

//

bot.command({
  name: "$alwaysExecute",
  code: `$useChannel[$getServerVar[rch]]
$replaceText[$replaceText[$replaceText[$replaceText[$getServerVar[rmsg];{user.tag};$userTag];{user.mention};<@$authorID>];{level};$getUserVar[lvl]];{exp};$getUserVar[exp]]
$setUserVar[lvl;$sum[$getUserVar[lvl];1]]
$setUserVar[rexp;$multi[$getUserVar[rexp];2]]
$onlyIf[$getUserVar[exp]>=$getUserVar[rexp];]
$onlyForServers[$guildID;]`
});

//

bot.command({
  name: "$alwaysExecute",
  code: `$setUserVar[exp;$sum[$getUserVar[exp];$random[1;4]]]
$onlyIf[$getServerVar[rsystem]>=1;]
$onlyForServers[$guildID;]`
});

bot.awaitedCommand({
  name: "errorrank",
  code: `$setServerVar[rch;]
$onlyForServers[$guildID;]`
});

bot.command({
  name: "rank",
  aliases: ["level"],
  usage: "rank (user)",
  description: "see the current level and exp",
  code: `$image[https://vacefron.nl/api/rankcard?username=$replaceText[$username[$mentioned[1;yes]]; ;+;-1]&avatar=$userAvatar[$mentioned[1;yes]]?size=4096&level=$getUserVar[lvl;$mentioned[1;yes]]&rank=&currentxp=$getUserVar[exp;$mentioned[1;yes]]&nextlevelxp=$getUserVar[rexp;$mentioned[1;yes]]&previouslevelxp=0&custombg=https://cdn.discordapp.com/attachments/793071150614970388/794565647760752650/20210101_205624.jpg&xpcolor=ffffff&isboosting=true]
$onlyIf[$getServerVar[rsystem]>=1;{description:Leveling system is __disabled__}{color:ff2050}]
$cooldown[5s;]`
});

// WELCOME MESSAGE
 `
});

// MESAJLARIM

bot.command({
  name: "$alwaysExecute",
  code: `
  
  $setUserVar[mesajpuan;$sum[$getUserVar[mesajpuan;$authorID];1];$authorID]


`
});



//  KÜFÜR ENGEL & REKLAM ENGEL

bot.command({
  name:"$alwaysExecute",
  code:`
  $deletecommand
  <:roller:851812861990666280> **<@$authorID>**, \`Küfür yasak!\`
  $onlyIf[$checkContains[$toLowercase[$message];amk;oç;sikim;sikik;orospu cocugu;aq:mq;mal:salak;gerizekalı;piç;orospu çocuğu]==true;]
  $onlyIf[$hasPerms[$authorID;admin]!=true;]
  `
})

bot.command({
  name:"$alwaysExecute",
  code:`
  $deletecommand
  <:roller:851812861990666280> **<@$authorID>**, \`Reklam yasak!\`
  $onlyIf[$checkContains[$toLowercase[$message];.com;discord.gg;.net;https://;.tk;.ck;.org]==true;]
  $onlyIf[$hasPerms[$authorID;admin]!=true;]
  `
})

// KÜFÜR ENGEL & REKLAM ENGEL

  name:"snipe",
  code:`
  $color[RANDOM]
  $description[
  En Son Silinen Mesaj : $getServerVar[snipe]
  
  Kanal : <#$getServerVar[snipek]>
  
  Kişi : <@$getServerVar[snipekk]> ]
  $onlyIf[$hasPerms[$authorID;admin]!=false;Yeterince yetkin bulunmamakta!]
  `
})



// SNİPE



bot.readyCommand({
  channel: "log kanalı idsi",
  code: `$djsEval[client.channels.cache.get("848564185264816209").join()]
hazırım ve girdim sese`
});

bot.musicStartCommand({
  channel: "$channeID",
  code: ``
});

bot.musicEndCommand({
  channel: "$channeID",
  code: ``
});

bot.command({
  name: "ping",
  code: `**Pingim $pingms**`
});

bot.status({
  text: "EXA FUN",
  type: "PLAYING",
  time: 4
});

bot.variables({
  mesajpuan: "0",
  afksebep: "",
  afk: "",
  şarkı: "",
  rch: "",
  rmsg: "**Tebrikler! `{user.tag}🎉,` Level atladın yeni levelin** __**{level}**__",
  lvl: "0",
  exp: "0",
  rexp: "40",
  rsystem: "0",
  snipe: "",
  snipek: "",
  snipekk: "",
});

