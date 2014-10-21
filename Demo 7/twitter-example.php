<?php

require_once 'vendor/autoload.php';

// https://github.com/skaterdav85/twitter-library
$twitterSearch = new Tang\TwitterRestApi\TwitterApi([
    'api_key' => '2lZ7adIQ10SuFYiZHSD4Dw',
    'api_secret' => 'H5loIfdbEzDZnD7bhAkodmAZJd0YabymXvadP4ngOkQ'
]);

$json = $twitterSearch->authenticate()->get('search/tweets', [
    'q' => 'laravel'
]);

echo $json;