TransactionView = Backbone.View.extend({
    tagName:  "li",
    template: "transactions/transaction_item",

    initialize: function() {
        _(this).bindAll('render');

        this.model.bind('change', this.render);
        this.model.view = this;
    },

    render: function() {
        attrs = _(this.model.attributes).extend(this.model.virtualAttributes());
        $(this.el).html(JST[this.template](attrs));
        this.$('.transaction-amount').formatCurrency({region: this.model.transactionCurrency(), cents: true});
        return this;
    }
});