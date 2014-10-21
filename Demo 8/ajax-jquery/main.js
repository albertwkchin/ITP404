$('#some-button').on('click', function() {

    $.ajax({
        url: 'example.php',
        type: 'GET',
        data: {
          searchTerm: 'jquery javascript ajax'
        },
        success: function(html) {
            $('#ajaxResponse').html(html);
        }
    });


});