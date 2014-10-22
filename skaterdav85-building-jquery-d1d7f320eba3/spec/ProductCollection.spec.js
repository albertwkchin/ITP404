describe('ProductCollection', function() {
    var products;

    // Run this function before each test to create the products array
    beforeEach(function() {
       products = new ProductCollection([
           { colorcode: 'BLK', color: 'black', price: 40 },
           { colorcode: 'RD', color: 'red', price: 30 },
           { colorcode: 'OR', color: 'orange', price: 50 },
           { colorcode: 'RD', color: 'red', price: 20 }
       ]);
    });

    describe('filterByColor()', function() {
        it('should filter products by color', function() {
            var filteredProducts = products.filterByColor('red');
            expect(filteredProducts).toEqual([
                { colorcode: 'RD', color: 'red', price: 30 },
                { colorcode: 'RD', color: 'red', price: 20 }
            ]);
        });
    });

});