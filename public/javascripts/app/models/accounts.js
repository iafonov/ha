AccountsList = Backbone.Collection.extend({
    url: "/accounts",

    initialize: function() {
        this.model = Account
    }
})