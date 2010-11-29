Transaction = Backbone.Model.extend({
    initialize: function() {
        _(this).bindAll('removeElement');
    },

    virtualAttributes: function() {
        return { accountFrom: this.accountFrom(), accountTo: this.accountTo(), transactionSumCents: this.transactionSumCents() };
    },

    removeElement: function() {
        $(this.view.el).remove();
    },

    clear: function() {
        this.destroy({success: this.removeElement});
    },

    accountFrom: function() {
        return AccountsList.get().get(this.get("operations")[0].account_id).toJSON();
    },

    accountTo: function() {
        return AccountsList.get().get(this.get("operations")[1].account_id).toJSON();
    },

    transactionSumCents: function() {
        return this.get("operations")[1].cents;
    },

    transactionCurrency: function() {
        return this.get("operations")[1].currency;
    }
});
