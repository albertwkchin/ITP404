var app = angular.module('movies', []);

app.controller('MoviesController', function ($scope, $http) {

    $scope.movieList = [];


    $scope.searchMovie = function() {
        console.log('searching movie');
        var searchTerm = $scope.search_term;
        //var searchTerm = $('#search-term').val();
        console.log(searchTerm);

        $('#results').html('Loading...');
        searchTerm = encodeURIComponent(searchTerm);

        var url = "http://api.rottentomatoes.com/api/public/v1.0/movies.json?q=" + searchTerm + "&page_limit=40&page=1&apikey=5xc2hxz9sy245jznzpgzwn57&callback=JSON_CALLBACK";
        $http.jsonp(url)
            .success(function(data) {
            $scope.movieList = data.movies.slice(0);
        });


    };
});
