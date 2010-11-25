Account = Backbone.Model.extend({
    initialize: function() {
        _.bindAll(this, 'removeElement');
    },

    removeElement: function() {
        $(this.view.el).remove();
    },

    clear: function() {
        this.destroy({success: this.removeElement});
    }
})
