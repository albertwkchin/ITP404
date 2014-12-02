var DataController = function() {
    this.keywords = [];

    this.searchResults = [];

    this.addKeyword = function(keyword) {
        this.keywords.push(keyword);
    }

    this.removeKeyword = function(keyword) {
        console.log("Removing " + keyword + " from data.");
        var index = this.keywords.indexOf(keyword);
        this.keywords.splice(index, 1);
    }

    this.removeAllKeywords = function() {
        this.keywords.splice(0, this.keywords.length);
    }

    this.yummlyPageQuery = function() {
        // Build the searchTerm
        if (this.keywords.length <= 0) {
            return;
        }

        var searchTerm = this.keywords.join();
        searchTerm = searchTerm.replace(/,/g, '+');

        var promise = $.ajax({
            url: 'YummlyPage.php',
            type: 'GET',
            dataType: 'json',
            data: {
                searchParameters: searchTerm
            }
        });

        return promise;
    }

    this.saveResults = function(results) {
        this.searchResults = results.matches.slice(0);
    }

    this.emptyResults = function() {
        this.searchResults.splice(0, this.searchResults.length);
    }

    this.nutrionixPageQuery = function(displayController) {

        this.searchResults.forEach(function(entry) {
            console.log(entry);
            // Construct the proper search term
            var searchTerm = encodeURIComponent(entry.recipeName);

            var promise = $.ajax ({
                url: 'NutrionixPage.php',
                type: 'GET',
                dataType: 'json',
                data: {
                    searchParameters: searchTerm
                }
            });
            console.log("promise fired");
            promise.done(function(nutritionJSON) {
                var second_promise = $.ajax({
                    url: 'YummlyPageRecipeRequest.php',
                    type: 'GET',
                    dataType: 'json',
                    data: {
                        searchParameters: entry.id
                    }
                });

                second_promise.done(function(response) {
                    displayController.renderData(nutritionJSON.hits, entry, response);
                })
            });
        })

    }
};