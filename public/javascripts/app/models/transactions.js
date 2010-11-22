TransactionList = Backbone.Collection.extend({
    url: "/transactions",

    initialize: function() {
        this.model = Account;
    }
})

TransactionList.get = function() {
    if (_.isEmpty(TransactionList.list)) {
        TransactionList.list = new TransactionList();
        TransactionList.list.fetch();
    }

    return TransactionList.list;
}