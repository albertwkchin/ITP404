var ProductCollection = function(data) {
    this.data = data;
};

/* IMPLEMENTATION 1
ProductCollection.prototype.filterByColor = function(color) {
//    var results = [];

//    for (var i = 0; i < this.data.length; i++) {
//        if (color === this.data[i].color) {
//            results.push(this.data[i]);
//        }
//    }

//    return results;

////////////////////////  SECOND IMPLEMENTATION

    var results = [];

    // Array.prototype.forEach
    this.data.forEach(function(product) {
        if (color === product.color) {
            results.push(product);
        }
    });

    return results;
};
*/

/* IMPLEMENTATION 2 */
ProductCollection.prototype.filterByColor = function(color) {
    return this.data.filter(function(product) {
        return color === product.color;
    });
};