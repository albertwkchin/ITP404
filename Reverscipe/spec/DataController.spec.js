describe('DataController', function() {
    var dataController;

    beforeEach(function() {
        dataController = new DataController();
        dataController.addKeyword("apple");
        dataController.addKeyword("banana");
        dataController.addKeyword("cantaloupe");
        dataController.addKeyword("daikon");
    });

    describe('dataController.addKeyword()', function() {
        it('should add the given keyword to the keywords array', function() {
            dataController.addKeyword("kumquat");
            expect(dataController.keywords).toEqual(["apple", "banana", "cantaloupe", "daikon", "kumquat"]);
        });
    });

    describe('dataController.removeKeyword()', function() {
        it('should remove the given keyword from the keywords array', function() {

            dataController.removeKeyword("banana");
            expect(dataController.keywords).toEqual(["apple", "cantaloupe", "daikon"]);

            dataController.removeKeyword("daikon");
            expect(dataController.keywords).toEqual(["apple","cantaloupe"]);
        });
    });

    describe('dataController.removeAllKeywords()', function() {
        it('should empty the keywords array', function() {
            dataController.removeAllKeywords();

            expect(dataController.keywords.length).toEqual(0);
        });
    });

    describe('dataController.saveResults()', function() {
        it('should save a copy of the given data array to its searchResults array', function() {

            var dummyArray = [1, 2, 3];
            var dummyObject = {
                matches: dummyArray
            }
            dataController.saveResults(dummyObject);

            expect(dataController.searchResults).toEqual(dummyArray);
        });
    });

    describe('dataController.emptyResults()', function() {
        it('should empty out the contents of the searchResults array', function() {

            var dummyArray = [1, 2, 3];
            var dummyObject = {
                matches: dummyArray
            }
            dataController.saveResults(dummyObject);

            dataController.emptyResults();

            expect(dataController.searchResults.length).toEqual(0);
        });
    });
});