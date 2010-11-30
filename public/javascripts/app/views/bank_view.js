BankView = Backbone.View.extend({
    el:  "#rates",
    template: "bank/bank",

    events: {
        "click #rates-line": "refresh"
    },

    initialize: function() {
        _(this).bindAll('render');

        this.model = Bank.get();
        this.model.bind('change', this.render);
    },

    refresh: function() {
        this.model.fetch();
    },

    render: function() {
        $(this.el).html(JST[this.template](this.model.toJSON()));
        this.$(".currency-rate").formatCurrency({region: "UAH", cents: false});
        return this;
    }
});