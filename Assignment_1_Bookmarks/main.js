/**
 * Created by Albert Chin on 9/8/14.
 */


var bookmarkArray = [
    {url:"http://google.com", name:"Google"},
    {url:"http://facebook.com", name:"Facebook"},
    {url:"http://youtube.com", name:"Youtube"}
];

var bookmarkList = {
    $bookmarks: $('#bookmarks'),

    /**
     * Takes a single bookmark object and creates some HTML
     * @param {Object} bookmark
     */
    createBookmarkHtml: function(bookmark) {
        // Your implementation
        var html =  '<br>' + '<a href =' + bookmark.url + '>' + bookmark.name + '</a>';
        return html;
    },

    /**
     * Renders an array of bookmark objects in #bookmarks
     * @param {Array} bookmarks
     */
    render: function(bookmarks) {
        // Your implementation
        var html = '';

        for (var i = 0; i < bookmarkArray.length; i++) {
            html = html + this.createBookmarkHtml(bookmarks[i]);
        }

        this.$bookmarks.html(html);
    },

    /**
     * Appends a bookmark object to #bookmarks and the bookmarks array
     * @param {Object} bookmark
     */
    addOne: function(bookmark) {
        // Your implementation
        bookmarkArray.push(bookmark);
        this.$bookmarks.append( this.createBookmarkHtml(bookmark) );
    }
};

var bookmarkValidation = {
    /**
     * @param {String} url
     * @return {Boolean} True if url is valid, false otherwise
     */
    hasValidUrl: function(url) {
        var regex = /^https?:\/\/.+$/;
        return regex.test(url);
    },

    /**
     * @param {String} name
     * @return {Boolean} True if name is valid (not empty), false otherwise
     */
    isNotEmpty: function(name) {
        if (name.length > 0) {
            return true;
        }
        else {
            // name field is empty
            return false;
        }
    },

    /**
     * @param {Object} bookmark
     * @return {Boolean} True if both tests pass, false otherwise
     */
    passes: function(bookmark) {
        if ( this.hasValidUrl(bookmark.url) && this.isNotEmpty(bookmark.name) ) {
            return true;
        }
        else {
            // at least one test failed
            return false;
        }
    }
};


// initial rendering of bookmark list

bookmarkList.render(bookmarkArray);



// on form submission, perform this action
$('form#new-thing').on('submit', function(e) {
    e.preventDefault();

    // your code here
    var temp = { url: $('#bookmarkURL').val() , name: $('#bookmarkName').val() };
    console.log(temp.url);
    console.log(temp.name);
    if ( bookmarkValidation.passes(temp) ) {
        console.log('it passed');
        $('#error').html('');
        bookmarkList.addOne(temp);
        $('.resettable').trigger("reset");
    }

    else { // temp.passes() returns false
        console.log('it failed');
        $('#error').html('The name field is required and the url field must be a valid URL');
    }
});





