function yummlyPageQuery(searchTerm) {
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

function renderResponse(data) {
    var recipeTemplate = Handlebars.compile(jQuery('#recipe-template').html());

    console.log(data);
    var html = '';

    for (var i = 0; i < data.matches.length; i++) {
        html += recipeTemplate(data.matches[i]);
    }

    $('#results').html(html);
}


$('form').on('submit', function(e) {
    e.preventDefault();

    var searchTerm = $('#search-term').val();
    console.log(searchTerm);

    $('#results').html('Loading...');

    var promise = yummlyPageQuery(searchTerm);

    promise.done(function(response) {
       renderResponse(response);
    });
});
