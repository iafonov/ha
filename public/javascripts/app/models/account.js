Account = Backbone.Model.extend({
    clear: function() {
        self = this;
        this.destroy({success: function() {
            $(self.view.el).remove();
        }});
    }
})
