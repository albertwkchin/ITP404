///////////////// RUN THIS CODE //////////////

var latlngInitial = new google.maps.LatLng(36.05178307933835, 42.49737373046878);
var mapElement = document.getElementById('map-canvas');
var map = new google.maps.Map(mapElement, {
    center: latlngInitial,
    zoom: 8
});
var defaultArtist = 'Limp Bizkit';
requestData(defaultArtist);


//////////////// DATA REQUEST & MAP STUFF ////////////////

function processJSONP(data) {
    console.log("JSONP request returned, logging data.");
    console.log(data);
    populateMap(data);
    concertList.process(data);
}

function populateMap(data) {
    var newCenter = new google.maps.LatLng(data.events.event[0].latitude, data.events.event[0].longitude);
    map.setCenter(newCenter);

    for (var i = 0; i < data.events.event.length; i++) {
        var latlng = new google.maps.LatLng(data.events.event[i].latitude, data.events.event[i].longitude);
        var dataString = data.events.event[i].title + '  :::  ' + data.events.event[i].start_time;
        plotPoint(latlng, dataString);
    }
}


function requestData(artistName) {
    var searchTerm = encodeURIComponent(artistName);

    var script = document.createElement('script');
    script.src = 'http://api.eventful.com/json/events/search?c=music&app_key=QFgjMgQjjjhwFqT2&page_number=1&date=Future&keywords=' + searchTerm + '&callback=processJSONP';
    document.getElementsByTagName('head')[0].appendChild(script);
};



function plotPoint(latlng, dataString) {
    //new marker

    var marker = new google.maps.Marker({
        map: map,
        position: latlng,

    });

    createInfoWindow(latlng, marker, dataString);
}


function createInfoWindow(latlng, marker, dataString) {

    var infowindow = new google.maps.InfoWindow({
       content: dataString,
       position: latlng
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map);
    });

    marker.setMap(map);
}

/////////////////////////////////////////////////////////////////////////////

///////// MODELING AND DISPLAY STUFF ///////////

var concertList = {

    process: function(data) {
        var concertCollection = new ConcertCollection(data.events.event);
        var concertView = new ConcertView({ collection: concertCollection });
        $('#results').html(concertView.render().el);
    }
};

var Concert = Backbone.Model.extend({

    defaults: {
    },

    initialize: function(options) {
    }
});

var ConcertCollection = Backbone.Collection.extend({
    model: Concert
});

var ConcertItemView = Backbone.View.extend({
    template: Handlebars.compile($('#concert-template').html()),

    render: function(){
        var html = this.template(this.model.toJSON());
        this.$el.html(html);
        return this;
    }
});

var ConcertView = Backbone.View.extend({
    render: function(){
        this.collection.each( function(concert) {
            var concertItemView = new ConcertItemView({ model: concert });
            this.$el.append(concertItemView.render().el); // adding all the concertItemView objects.
        }, this);
        return this;
    }
});

//////////////////////////////////////////////////////////






