module.exports = {
  name:"isim",
  code:`
  $changeNickname[$mentioned[1];$noMentionMessage]
  $author[EXA;$authorAvatar]
$color[6495ed]
  $description[<@$mentioned[1]> **adlı kullanıcının ismi başarıyla** \`$noMentionMessage\` **olarak değiştirildi**   ]
 $argsCheck[>1;Kimin ismi değişecek?]
 $argsCheck[>2;Kullanıcının yeni ismi ne olucak?]
  $onlyIf[$hasPerms[$authorID;admin]!=false;Bu komudu kullanabilmek için yeterli yetkin yok!]
  
  
  
  
  
  
  `
  
}
