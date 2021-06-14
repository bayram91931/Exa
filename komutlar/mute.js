module.exports = {
  name:"mute",
  code:`
  <@$mentioned[1]> Kişisinin Susturulması Açıldı !
  $takeRoles[$mentioned[1];851817221981732895]$wait[$message[2]]
  $giveRoles[$mentioned[1];851817221981732895]
  $onlyPerms[admin;Yetkin Yok!]
  $onlyIf[$message[2]!=;**Doğru kullanım** .mute <kişi> <süre>]
  `
}
