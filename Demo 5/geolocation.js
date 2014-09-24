console.log('start');


//this block of code is asynchronous
window.navigator.geolocation.getCurrentPosition(function(position) {
    console.log(position);
}, function(err) {
    
});


console.log('end');

// will output 'start', 'end', position