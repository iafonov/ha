ViewManager = function(options) {
  options || (options = {});
  if (options.container) {
    this.container = options.container;
    delete options.container;
  }

  this._refresh();
};

_.extend(ViewManager.prototype, {

  add : function(view) {
      console.log(view);
  },

  _refresh : function() {
      console.log("refresh")
  }
});
