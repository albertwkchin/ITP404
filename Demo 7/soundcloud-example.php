<?php

require 'SoundCloud.php';

$soundcloud = new SoundCloud([
    'client_id' => 'fab1869f594107d250ff7afcd029dfc4'
]);

$json = $soundcloud->getUsers('users/iammcjin/tracks.json');

echo $json;