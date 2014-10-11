var jQuery = function(selector) {
    if (this instanceof jQuery) {
        this.elements = document.querySelectorAll(selector);
    }
    else {
        return new jQuery(selector);
    }
};

jQuery.prototype.css = function() {

    //keyword 'arguments' in every function
    if (arguments.length == 2) {
        var property = arguments[0];
        var value = arguments[1];

        for (var i = 0; i < this.elements.length; i++) {
            this.elements[i].style[property] = value;
        }
    }


    return this;    // allows method chaining
};


jQuery.prototype.on = function(event, callback) {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].addEventListener(event, function(e) {
            var element = this;
            console.log(element);
            //normalize event object here for cross browser
            var normalizedEvent = e; //normalize here
            callback.call(element, normalizedEvent);
            //callback.apply(element, [normalizedEvent]);
        });
    }
};


jQuery.param = function(obj) {
    var queryString = [];

    for (var key in obj) {
        queryString.push(key + '=' + obj[key]);
    }

    return queryString.join('&');
};



//add jQuery hack
window.$ = jQuery;

