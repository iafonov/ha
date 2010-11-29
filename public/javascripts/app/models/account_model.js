Account = Backbone.Model.extend({
    initialize: function() {
        _(this).bindAll('removeElement');
    },

    removeElement: function() {
        $(this.view.el).remove();
    },

    clear: function() {
        this.destroy({success: this.removeElement});
    }
});
