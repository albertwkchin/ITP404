/**
 * Created by Albert Chin on 9/9/14.
 */

var fetchFbData = function(page) {
    console.log(page);

    var script = document.createElement('script');
    script.src = "https://graph.facebook.com/" + page + "?callback=hello";
    document.getElementsByTagName('head')[0].appendChild(script);
};


// try to keep html & javascript separate, use templating instead


// 1. tell Handlebars about our template
var scriptHTML = document.getElementById('page-template').innerHTML;
var templateFunction = Handlebars.compile(scriptHTML);

var hello = function(data) {
    console.log(data);

    // 2. pass the data to the template
    var html = templateFunction(data);

    // 3. place interpolated html in the page
    document.getElementById('results').innerHTML = html;
};