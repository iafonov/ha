Mustache.template = function(templateString) {
    return function() { 
        return Mustache.to_html(templateString, arguments[0], arguments[1]); 
  };
};

_.templateSettings = {
    interpolate : /\{\{(.+?)\}\}/g
};

$(document).ready(function() {
    workspace = new Workspace();
});