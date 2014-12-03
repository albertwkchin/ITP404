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
            url: 'php/YummlyPage.php',
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

            // Construct the proper search term
            var searchTerm = encodeURIComponent(entry.recipeName);

            var promise = $.ajax ({
                url: 'php/NutrionixPage.php',
                type: 'GET',
                dataType: 'json',
                data: {
                    searchParameters: searchTerm
                }
            });

            promise.done(function(nutritionJSON) {
                var second_promise = $.ajax({
                    url: 'php/YummlyPageRecipeRequest.php',
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



var DisplayController = function() {

    this.addKeyword = function(keyword) {
        $('<li><input type="button" class="ingredients" value=' + keyword + ' name=' + keyword + ' id=' + keyword + ' ></li>')
            .appendTo("#keyword-list")

        $('#' + keyword).click(function () {
           data.removeKeyword(keyword);
           $(this).remove();
        });
    }

    this.clearKeywords = function() {
        $('#keyword-list').empty();
    }

    this.renderData = function(nutritionJSON, recipeJSON, specificRecipeJSON) {
        var recipeTemplate = Handlebars.compile(jQuery('#recipe-template').html());

        // Calculate the average calories/sodium from nutritionJSON
        var calories = 0;
        var sodium = 0;
        nutritionJSON.forEach(function(entry) {
           calories += entry.fields.nf_calories;
           sodium += entry.fields.nf_sodium;
        });
        calories = Math.round(calories / (nutritionJSON.length));
        sodium = Math.round(sodium / (nutritionJSON.length));

        // Calculate the time in minutes from totalTimeInSeconds
        var minutes = 0;
        var seconds = recipeJSON.totalTimeInSeconds;
        var time = '';
        if (seconds == null) {
            seconds = 0;
        }
        while (seconds >= 60) {
            minutes++;
            seconds = seconds - 60;
        }
        if (minutes == 0 && seconds == 0) {
            time =  "No estimate given.";
        }
        else {
            time = minutes + " minutes";
        }


        var html = recipeTemplate({
            recipeName: recipeJSON.recipeName,
            imageUrlsBySize: recipeJSON.imageUrlsBySize,
            avg_calories: calories,
            avg_sodium: sodium,
            totalTime: time,
            rating: recipeJSON.rating,
            ingredients: specificRecipeJSON.ingredientLines,
            servingNumber: specificRecipeJSON.numberOfServings,
            sourceLink: specificRecipeJSON.source.sourceRecipeUrl
        });

        $('#results').append(html);
    }

};


var data = new DataController();
var display = new DisplayController();


/* BUTTON HANDLERS */

$('#keyword-form').on('submit', function(e) {
    e.preventDefault();


    var keyword = $('#keyword-term').val();
    keyword = keyword.trim();
    if (keyword == '') {
        return;
    }

    var keyword_arr = keyword.split(' ');

    if (keyword_arr.length <= 0) {
        return;
    }

    keyword_arr.forEach(function(entry) {
        // Add to data controller
        console.log("Adding " + entry + " to keywords");

        data.addKeyword(entry);

        // Add to html list
        display.addKeyword(entry);
    });

    // Clear the form
    $('#keyword-term').val('');
});



$('#search-form').on('submit', function(e) {
    e.preventDefault();

    $('#results').html('Searching...');

    var promise = data.yummlyPageQuery();

    promise.done(function(response) {
        $('#results').html('');

        if (response == null) {
            $('#results').html('No results found. Please try fixing your keyterms.');
        }
        if (response.matches.length == 0) {
            $('#results').html('No results found. Please try fixing your keyterms.');
        }
        data.saveResults(response);
        data.nutrionixPageQuery(display, response);
    });
});



$('#clear-form').on('submit', function(e) {
    e.preventDefault();

    data.removeAllKeywords();
    display.clearKeywords();
});