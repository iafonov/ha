Backbone.sync = function(method, model, success, error) {
    function runCallbackIfDefined(callback, parameter) {
        if (_(callback).isFunction()) {
            callback(parameter);
        }
    }

    function extractModelErrors(errors) {
        if (!_(errors).isUndefined()) {
            return _(errors).keys().map(function(key) {
                return key == "base" ? errors[key] : (key + " " + errors[key]);
            });
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
    };

    var sendModel = method === 'create' || method === 'update';
    var data = sendModel ? {model : JSON.stringify(model)} : {};
    var type = methodMap[method];

    startSpinner();
    $.ajax({
        url       : _(model.url).isFunction() ? model.url() : model.url,
        type      : type,
        data      : data,
        dataType  : 'json',
        success   : function(response) {
            endSpinner();
            if (_(response["errors"]).isEmpty()) { //todo add 500 & 422 handling
                runCallbackIfDefined(success, response);
            } else {
                $.toggleFlash(extractModelErrors(response.errors));

                runCallbackIfDefined(error, response);
            }
        },
        error     : function(response) {
            endSpinner();
            runCallbackIfDefined(error, response);
        }
    });
};