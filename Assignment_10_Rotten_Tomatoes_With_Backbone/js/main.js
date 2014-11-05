$('form').on('submit', function(e) {
    e.preventDefault();

    var searchTerm = $('#search-term').val();
    console.log(searchTerm);

    $('#results').html('Loading...');
    rottenTomatoes.search(searchTerm);
});

var rottenTomatoes = {
    search: function(searchTerm) {
        searchTerm = encodeURIComponent(searchTerm);

        var script = document.createElement('script');
        script.src = "http://api.rottentomatoes.com/api/public/v1.0/movies.json?q=" + searchTerm + "&page_limit=40&page=1&apikey=5xc2hxz9sy245jznzpgzwn57&callback=renderMovies"
        document.getElementsByTagName('head')[0].appendChild(script);
    }
};

var renderMovies = function(data) {
    console.log(data);
    movieList.process(data);
}

var movieList = {

    process: function(data) {
        console.log(data);

        var movieCollection = new MovieCollection(data.movies);
        var movieView = new MovieView({ collection: movieCollection });
        $('#results').html(movieView.render().el);
    }
};

var Movie = Backbone.Model.extend({

    defaults: {
        image: 'images/default.png',
        runtimeHours: 'N/A',
        runtime: 15
    },

    initialize: function(options) {
        var minutes = '';
        var hours = '';
        var finalString = '';
        var digits = options.runtime.toString().split('');
        // Check how many digits are in digits
        if (digits.length <= 2) {
            hours = '0'
            if (digits[0] == '0') {
                minutes = digits[1];
            }
            else {
                minutes = digits[0] + digits[1];
            }
        }
        else { //digits.size() == 3
            hours = digits[0]

            if (digits[1] == '0') {
                minutes = digits[2];
            }
            else {
                minutes = digits[1] + digits[2];
            }
        }

        if (hours == '0') {
            finalString = minutes + ' minute(s)';
        }
        else {
            finalString = hours + ' hour(s) ' + minutes + ' minute(s)';
        }

        if (options.runtime == "") {
            finalString = 'N/A';
        }
        this.set({ runtimeHours: finalString });
    }
});

var MovieCollection = Backbone.Collection.extend({
    model: Movie
});

var MovieItemView = Backbone.View.extend({
    template: Handlebars.compile($('#movie-template').html()),

    render: function(){
        var html = this.template(this.model.toJSON());
        this.$el.html(html);
        return this;
    }
});

var MovieView = Backbone.View.extend({
    render: function(){
        this.collection.each( function(movie) {
            var movieItemView = new MovieItemView({ model: movie });
            this.$el.append(movieItemView.render().el); // adding all the movieItemView objects.
        }, this);
        return this;
    }
});
