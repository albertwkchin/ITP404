describe('Product', function() {
    it('should have a hasDiscount computed property ' +
        'return true if price > discountprice', function() {


        // 1. Arrange
        var shoe = new Product({
           price: 50,
           discountprice: 25
        });

        // 2. Act
        // 3. Assert
        expect(shoe.hasDiscount).toEqual(true);
    });


    it('should have a hasDiscount property return false' +
        ' if price = discountprice', function() {
        // 1. Arrange
        var shoe = new Product({
            price: 50,
            discountprice: 50
        });

        // 2. Act
        // 3. Assert
        expect(shoe.hasDiscount).toEqual(false);
    });


});