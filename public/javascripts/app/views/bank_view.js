BankView = Backbone.View.extend({
    el:  "#rates",
    template: "bank/bank",

    events: {
        "click #rates-line": "refresh"
    },

    initialize: function() {
        _(this).bindAll('render');

        this.model = new Bank();
        this.model.bind('change', this.render);

        this.refresh();
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