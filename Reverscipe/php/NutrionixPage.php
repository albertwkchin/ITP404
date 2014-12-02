<?php

$searchParams = $_GET['searchParameters'];

$appID = 'cf95c7b7';
$appKey = '85be7eff95d3211fac547d8a4594b6d6';


$url = 'https://api.nutritionix.com/v1_1/search/' . $searchParams . '?results=0:20&fields=item_name,brand_name,item_id,nf_calories,nf_sodium&appId='
    . $appID . '&appKey=' . $appKey;

/* The base url for the Search nutrition GET is
https://api.nutritionix.com/v1_1/search/SEARCH_TERM?results=0:20&fields=item_name,brand_name,item_id,nf_calories,nf_sodium&appId=APPID&appKey=APPKEY
*/

$json = file_get_contents($url);    // captures json as string

echo $json;

