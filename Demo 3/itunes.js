/**
 * Created by Albert Chin on 9/9/14.
 */

var songTemplateFunction = Handlebars.compile($('#song-template').html());

var search = function(searchTerm) {
    // computes spaces to %20 for browser
    searchTerm = encodeURIComponent(searchTerm);
    // url currently hardcoded to jack johnson. can make this dynamic VVV
    url = 'https://itunes.apple.com/search?term=' + searchTerm + '&callback=?';

    // anywhere you use $ you can use jQuery too! jQuery.getJSON() == $.getJSON()

    jQuery.getJSON(url, function(response) {
        console.log(response);

        var html = '';

        for (var i = 0; i < response.results.length; i++) {
            html += songTemplateFunction(response.results[i]);
        }

        $('#results').html(html);
    });
};

$('form').on('submit', function(e) {
    e.preventDefault();

    var searchTerm = $('#search-term').val();

    console.log(searchTerm);

    $('#results').html('Loading...');
    search(searchTerm);
});

