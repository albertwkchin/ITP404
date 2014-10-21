function requestUser() {
    var promise = $.ajax({
        type: 'GET',
        url: 'example.php'
    });

    return promise;
}

$('#some-button').on('click', function() {

    var promise = requestUser();

    promise.done(function(response) {
       console.log(response);
    });

    promise.done(function(response) {
        console.log(response);
    });

});

