Backbone.sync = function(method, model, success, error) {
    function runCallbackIfDefined(callback, parameter) {
        if (_.isFunction(callback)) callback(parameter)
    };

    function extractModelErrors(errors) {
        return _.map(_.keys(errors), function(key) {
            return (key + " " + errors[key])
        })
    }

    var methodMap = {
        'create': 'POST',
        'update': 'PUT',
        'delete': 'DELETE',
        'read'  : 'GET'
    };

    console.log(model)

    var sendModel = method === 'create' || method === 'update';
    var data = sendModel ? {model : JSON.stringify(model)} : {};
    var type = methodMap[method];

    $.ajax({
        url       : _.isFunction(model.url) ? model.url() : model.url,
        type      : type,
        data      : data,
        dataType  : 'json',
        success   : function(response) {
            if (response.hasOwnProperty("valid?") && !response["valid?"]) {
                $.toggleFlash(extractModelErrors(response.errors))

                runCallbackIfDefined(error, response)
            } else {
                runCallbackIfDefined(success, response)
            }
        },
        error     : function(response) {
            runCallbackIfDefined(error, response)
        }
    });
};