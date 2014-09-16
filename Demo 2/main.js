/**
 * Created by Albert Chin on 9/2/14.
 */

// priyankv@usc.edu         TA email

var groceriesData = [
    'Organic Mixed Greens',
    'Dark Chocolate Almonds',
    'Almond Milk',
    'Peanut Butter',
    'Peaches',
    'Water',
    'Green Machine',
    'Beer'
];

var groceriesList = {
    initialize: function(options) {
        this.groceries = options.data;
        this.$element = $(options.element); // equivalent of doing $('#groceries')
                                            // can also be written as this.$element = $('#groceries');
    },

    filterBy: function(searchTerm) {
        searchTerm = searchTerm.toLowerCase();
        var html;

        for (var i = 0; i < this.groceries.length; i++) {
            groceryItem = this.groceries[i].toLowerCase();
            if (groceryItem.indexOf(searchTerm) > -1) {
                html = html + '<li>' + this.groceries[i] + '</li>';
            }
        }

        this.$element.html(html);
//        $('#groceries').html(html);
    },

    render: function() {
        var html = '';

        for (var i = 0; i < this.groceries.length; i++) {
            html = html + '<li>' + this.groceries[i] + '</li>';
        }

        this.$element.html(html).hide().fadeIn(300);
    }
};

groceriesList.initialize({
    element: '#groceries',
    data: groceriesData
});

groceriesList.render();


$('input#search').on('keyup', function() {
   var searchTerm = this.value; // raw DOM way
//  var searchTerm = $(this).val(); // jQuery
   groceriesList.filterBy(searchTerm);

});
