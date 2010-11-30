Bank = Backbone.Model.extend({
    url: "/exchange_rates",

    exchange: function (cents, from, to) {
        if (from === to) {
            return cents;
        }

        return cents * this.get(from + "_TO_" + to);
    }
});

Bank.get = function() {
    if (_(Bank.instance).isEmpty()) {
        Bank.instance = new Bank();
        Bank.instance.fetch();
    }

    return Bank.instance;
};
