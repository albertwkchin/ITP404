var jQuery = function(selector) {
    if (this instanceof jQuery) {
        this.elements = document.querySelectorAll(selector);
    }
    else {
        return new jQuery(selector);
    }
};


jQuery.prototype.html = function(insideText) {
    if (arguments.length != 0) {
        for (var i = 0; i < this.elements.length; i++) {
            this.elements[i].innerHTML = insideText.toString();
        }
        return this;
    }
    // else no arguments, getting the html
    else {
        var htmlString = this.elements[0].innerHTML.toString();
        return htmlString;
    }
};


jQuery.prototype.css = function() {
    if (arguments.length == 0) {
        return this;
    }

    if (arguments[0] instanceof Object && arguments[0] !== null) {
        for (var i = 0; i < arguments.length; i++) {
            currentObj = arguments[i];
            for (var property in currentObj) {
                for (var j = 0; j < this.elements.length; j++) {
                    this.elements[j].style[property] = currentObj[property];
                }
            }
        }
        return this;
    }

    //keyword 'arguments' in every function
    else if (!(typeof arguments[0] == Object) ) {
        for (var i = 0; i < arguments.length; i = i + 2) {
            for (var j = 0; j < this.elements.length; j++) {
                var property = arguments[i];
                var value = arguments[i + 1];
                this.elements[j].style[property] = value;
            }
        }
        return this;    // allows method chaining
    }

};


jQuery.prototype.attr = function() {
    if (arguments.length == 1) {
        var attribute = this.elements[0].getAttribute(arguments[0]);
        return attribute;
    }

    else {
        for (var i = 0; i < arguments.length; i = i + 2) {
            var attribute = arguments[i];
            var value = arguments[i+1];
            for (var j = 0; j < this.elements.length; j++) {
                this.elements[j].setAttribute(attribute, value);
            }
        }
        return this;
    }
};


jQuery.each = function() {
    var element = arguments[0];
    var func = arguments[1];

    if (element instanceof Array) {
        for (var i = 0; i < element.length; i++) {
            func(i, element[i]);
        }
    }

    else if (element instanceof Object) {
        for (var key in element) {
            func(key, element[key]);
        }
    }
};


//add jQuery hack
window.$ = jQuery;

