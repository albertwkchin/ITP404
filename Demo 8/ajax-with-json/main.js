var totalCount = 0;

function facebookPageQuery(page) {
    var promise = $.ajax({
        url: 'FacebookPage.php',
        type: 'GET',
        dataType: 'json',
        data: {
            pageName: page
        }
    });

    return promise;
}

$('#facebook-pages').on('click', 'a', function(e) {

    var page = $(this).attr('id');   // this.id for plain javascript

    console.log(page);

    var promise = facebookPageQuery(page);

    promise.done(function(response) {
       console.log(response);
       // can do stuff like insert client side templating here to render out onto screen

    });

    promise.done(function(response) {
        totalCount++;
        $('#total-Count').html(totalCount);
    });

});