TransactionView = Backbone.View.extend({
    tagName:  "li",
    template: "transactions/transaction_item",

    initialize: function() {
        _.bindAll(this, 'render');
        this.model.bind('change', this.render);
        this.model.view = this;
    },

    render: function() {
        $(this.el).html(JST[this.template](this.model.toJSON()))
        return this;
    }
});