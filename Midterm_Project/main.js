var latlngInitial = new google.maps.LatLng(50, 50);

var mapElement = document.getElementById('map-canvas');

var map = new google.maps.Map(mapElement, {
    center: latlngInitial,
    zoom: 5
});



function plotPoint(latlng) {
    //new marker
    //new info window with text = formatted_address
    //set click event on marker to open info window
    //set center of map to latlng

    var markerIcon = {
        url: 'http://allthingsclipart.com/04/sea.otter.04.jpg',
        size: new google.maps.Size(50, 50),
        scaledSize: new google.maps.Size(50,50)
    };


    var marker = new google.maps.Marker({
        map: map,
        position: latlng,
        animation: google.maps.Animation.BOUNCE,
        icon: markerIcon
    });

    map.setCenter(latlng);
    createInfoWindow(latlng, marker);
}

function createInfoWindow(latlng, marker) {
    // first geocode the latlng
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({latLng: latlng}, function(results) {
        console.log(results);

        if (results.length > 0) {
            // there's some address nearby, now get the address and create the infowindow
            var address = results[0].formatted_address;
            var infowindow = new google.maps.InfoWindow({
                content: address,
                position: latlng
            });

            google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map);
            });

        } else {
            toastr.error('No results found');
        }
    } )
}

window.navigator.geolocation.getCurrentPosition(function(position) {
    console.log(position);
    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    plotPoint(latlng);
}, function(err) {

});
