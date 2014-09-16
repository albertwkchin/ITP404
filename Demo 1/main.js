
//groceries is used elsewhere so it is left outside displayGroceries() so it remains global
var groceries = [
	'Organic Mixed Greens',
	'Dark Chocolate Almonds',
	'Almond Milk',
	'Peanut Butter',
	'Peaches',
	'Water',
	'Green Machine',
	'Beer'
];


function displayGroceries() {

	var html = '';
	var li;

	for (var i = 0; i < groceries.length; i++) {
		li = '<li>' + groceries[i] + '</li>';
		html = html + li;
	}

	//without jQuery
	//document.getElementById('groceries').innerHTML = html;

	//with jQuery
	$('#groceries').html(html).hide().fadeIn(300);
}

displayGroceries();

$('input#search').on('keyup', function() {
	//console.log('searching...');   // testcode will log "searching in console"
	var searchTerm = this.value.toLowerCase();
	//console.log(searchTerm);	// testcode will log the searchbox text in console
	
	//variables are local to the scope of the function they are in (locally-scoped)
	var results = '';
	var groceryItem;
	
	for (var i = 0; i < groceries.length; i++) {
		groceryItem = groceries[i].toLowerCase();
		
		if (groceryItem.indexOf(searchTerm) > -1) {
			//searchTerm was found in current grocery item
			results = results + '<li>' + groceries[i] + '</li>'
		}
	}
	
	$('#groceries').html(results);
});

//leaving off var will automatically declare a global variable, even within a function
//using keyword var will create a locally-scoped variable (locally-scoped to the function)



