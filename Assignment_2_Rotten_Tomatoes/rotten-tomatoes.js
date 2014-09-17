/**
 * Created by Albert on 9/16/14.
 */

var movieList = {
    movieTemplate: Handlebars.compile(jQuery('#movie-template').html()),

    render: function(data) {
            console.log(data);
            var html = '';

            for (var i = 0; i < data.movies.length; i++) {
                html += this.movieTemplate(data.movies[i]);
            }

            $('#results').html(html);
    }
};

var rottenTomatoes = {
    search: function(searchTerm) {
        searchTerm = encodeURIComponent(searchTerm);

        var script = document.createElement('script');
        script.src = "http://api.rottentomatoes.com/api/public/v1.0/movies.json?q=" + searchTerm + "&page_limit=40&page=1&apikey=5xc2hxz9sy245jznzpgzwn57&callback=renderMovies"
        document.getElementsByTagName('head')[0].appendChild(script);
    }
};

$('form').on('submit', function(e) {
    e.preventDefault();

    var searchTerm = $('#search-term').val();
    console.log(searchTerm);

    $('#results').html('Loading...');
    rottenTomatoes.search(searchTerm);
});


var renderMovies = function(data) {
    console.log(data);
    movieList.render(data);
}

