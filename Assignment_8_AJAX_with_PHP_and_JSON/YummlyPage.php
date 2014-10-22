<?php

$searchParams = $_GET['searchParameters'];

$appID = '63a37004';
$appKey = '17994c6ca258e4e8fe47717039ba9e6a';


$url = 'http://api.yummly.com/v1/api/recipes?_app_id=' . $appID . '&_app_key=' . $appKey . '&q=' . $searchParams;

/* The base url for the Search Recipes GET is
http://api.yummly.com/v1/api/recipes?_app_id=app-id&_app_key=app-key&your_search_parameters */


$json = file_get_contents($url);    // captures json as string

echo $json;

