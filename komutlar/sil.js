module.exports = {
  name:"sil",
  code:`
  \`\`$message\`\` mesaj başarıyla silindi
  $deletecommand
  $deleteIn[4s]
  $clear[$message[1]]
  $suppressErrors[Hata !]
  $onlyIf[$hasPerms[$authorID;managemessages]!=false;Bu komutu kullanmak için \`\`Mesajları Yönet\`\` yetkin olmalı]
  $onlyIf[$message!=;Mesaj Miktarı Girermisin !]
  $onlyIf[$isNumber[$message[1]]!=false;Bir rakam girmen gerek!]
  $onlyIf[$message[1]>0;Girdiğin rakam 1'in altında olamaz!]
  $onlyIf[$message[1]<101;Girdiğin rakam 100'ün altında olmalı!]  
`
}
