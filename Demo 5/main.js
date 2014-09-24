/* GOOGLE MAPS STUFF */

var latlng = new google.maps.LatLng(34.0029139, -118.4204);

var mapElement = document.getElementById('map-canvas');

var map = new google.maps.Map(mapElement, {
    center: latlng,
    zoom: 5
});

var marker = new google.maps.Marker({
    map: map,
    position: latlng,
    animation: google.maps.Animation.DROP
});

var infowindow = new google.maps.InfoWindow({
    content: '<strong>Hello!</strong>',
    position: latlng
});


google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map);
});


function plotPoint(latlng, formatted_address) {
    //new marker
    //new info window with text = formatted_address
    //set click event on marker to open info window
    //set center of map to latlng

    var marker = new google.maps.Marker({
        map: map,
        position: latlng,
        animation: google.maps.Animation.DROP
    });

    var infowindow = new google.maps.InfoWindow({
        content: formatted_address,
        position: latlng
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open();
    });

    map.setCenter(latlng);
}

jQuery('form').on('submit', function(e) {
    var search = $('#search').val();

    var geocoder = new google.maps.Geocoder();

    //asynchronous operation: when this method is called, it will fire off a search, then continue reading the rest of the code
    //(will not get locked up on this line of code); when the search returns, it will execute the code inside
    geocoder.geocode( {address: search}, function(results) {
        console.log(results);

        if (results.length > 0) {
            var latlng = results[0].geometry.location;
            console.log(latlng.lat(), latlng.lng());

            plotPoint(latlng, results[0].formatted_address);
        } else {
            toastr.error('No results found');
        }

    });

    console.log(search);
    e.preventDefault();
});

google.maps.event.addListener(map, 'click', function(event) {
    var latlng = event.latLng;
    console.log(latlng.lat(), latlng.lng());

    console.log(Object.getPrototypeOf(latlng));
});
