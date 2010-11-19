AccountsList = Backbone.Collection.extend({
    url: "/accounts",

    initialize: function() {
        this.model = Account;
    }
})

AccountsList.get = function() {
    if (_.isEmpty(AccountsList.list)) {
        AccountsList.list = new AccountsList();
    }

    return AccountsList.list;
}