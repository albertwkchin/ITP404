<?php

/*
TO START: Download & install XAMP (preferably in your repository folder)
THEN: Start XAMPP from console (same way as you would do in mac)
THEN: Put your project folder in the htdocs directory in xampp folder
THEN: copy the directory your project folder is in and URL is localhost:3000/YOUR_DIRECTORY
*/


$instagram_endpoint = "https://api.instagram.com/v1/tags/cats/media/recent?client_id=18d3e66a27794277be584c98feaa8b8c";
$json = file_get_contents($instagram_endpoint);
$instagram_response = json_decode($json); // instagram json as an object

$items = $instagram_response->data; // array

?>

<html>
<head>
    <title></title>
</head>

<body>

<h1>Cats of Instagram</h1>

<?php
 //   foreach ($items as $instagram) {
 //       echo "<img src='".$instagram->images ->thumbnail->url."'>";
 //   }
?>

<?php foreach ($items as $instagram) : ?>
    <img src="<?php echo $instagram->images->thumbnail->url ?>">
<?php endforeach; ?>


<script>
    var instagramData = <?php echo $json; ?>;
</script>


<?php
/* more notes:
GET, POST, PUT, DELETE, PATCH are all "http verbs"

CRUD operations (Create, Read, Update, Delete)
HTTP VERB   URL

GET         /api/cats    -    get a list of cats
GET         /api/cats/5   -   get cat with id 5
POST        /api/cats    -    create a cat in db
PUT         /api/cats/5    -  edit cat with id 5
DELETE      /api/cats/5   -   delete cat with id 5

GET         /cats/new    -    show an HTML form to create a new cat


*/
?>

</body>
</html>