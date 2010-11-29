TransactionView = Backbone.View.extend({
    tagName:  "li",
    template: "transactions/transaction_item",

    initialize: function() {
        _(this).bindAll('render');

        this.model.bind('change', this.render);
        this.model.view = this;
    },

    render: function() {
        $(this.el).html(JST[this.template](this.model.allAttributes()));
        this.$('.transaction-amount').formatCurrency({region: this.model.transactionCurrency(), cents: true});
        return this;
    }
});