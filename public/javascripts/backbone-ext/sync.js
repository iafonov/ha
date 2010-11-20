Backbone.sync = function(method, model, success, error) {
    console.log("sync url:" + (_.isFunction(model.url) ? model.url() : model.url) + " method " + method);
    function runCallbackIfDefined(callback, parameter) {
        if (_.isFunction(callback)) callback(parameter);
    }

    function extractModelErrors(errors) {
        if (!_.isUndefined(errors)) {
            return _.map(_.keys(errors), function(key) {
                return key == "base" ? errors[key] : (key + " " + errors[key]);
            })
        }
    }

    function startSpinner() {
        $("#spinner").show();
    }

    function endSpinner() {
        $("#spinner").hide();
    }

    var methodMap = {
        'create': 'POST',
        'update': 'PUT',
        'delete': 'DELETE',
        'read'  : 'GET'
    }

    var sendModel = method === 'create' || method === 'update';
    var data = sendModel ? {model : JSON.stringify(model)} : {};
    var type = methodMap[method];

    startSpinner();
    $.ajax({
        url       : _.isFunction(model.url) ? model.url() : model.url,
        type      : type,
        data      : data,
        dataType  : 'json',
        success   : function(response) {
            endSpinner();
            if (_.isEmpty(response["errors"])) {
                runCallbackIfDefined(success, response)
            } else {
                $.toggleFlash(extractModelErrors(response.errors))

                runCallbackIfDefined(error, response)
            }
        },
        error     : function(response) {
            endSpinner();
            runCallbackIfDefined(error, response)
        }
    });
};