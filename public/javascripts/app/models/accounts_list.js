AccountsList = Backbone.Collection.extend({
    url: "/accounts",

    initialize: function() {
        this.model = Account;
    },

    reload: function() {
        this.invoke('removeElement');
        this.fetch();
    }
})

AccountsList.get = function() {
    if (_.isEmpty(AccountsList.list)) {
        AccountsList.list = new AccountsList();
        AccountsList.list.fetch();
    }

    return AccountsList.list;
}