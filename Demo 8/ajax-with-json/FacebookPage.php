<?php 

$page = $_GET['pageName'];

$url = 'https://graph.facebook.com/' . $page;
$json = file_get_contents($url);    // captures json as string

echo $json;
