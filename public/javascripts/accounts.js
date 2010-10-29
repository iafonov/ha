
window.Account = Backbone.Model.extend({
})

window.AccountsList = Backbone.Collection.extend({
  model: Account
})

window.Accounts = new AccountsList;