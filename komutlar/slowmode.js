module.exports = {
  name: "slowmode",
  code: `
 Kanalın yavaş modu \`\`$message\`\` olarak ayarlandı !
$slowmode[$channelID;$messages] $onlyIf[$hasPerms[$authorID;managechannels]==true;Bu komudu sadece \`\`Kanalları Yönet\`\` olanlar kullanabilir!]

  $onlyIf[$isNumber[$message]==true;Girdiğin şey bir rakam olmalı!]
  $onlyIf[$message[1]>=0;Yavaş modu 0 olamaz!]
  $onlyIf[$message!=;Bir rakam girmedin!]
  `
};
