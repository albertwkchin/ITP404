var Product = function(data) {
    if (data.price > data.discountprice) {
        this.hasDiscount = true;
    }
    else {
        this.hasDiscount = false;
    }
};