<?php
// Store your secret key here
// Make sure you use better, long, more random key than this
$config['key'] = "everything_you_can_think_of"; // secret key
$config['iss'] = "http://api.local/"; // domain name
$config['aud'] = "http://api.local/"; // domain name
$config['iat'] = time(); // current time
$config['nbf'] = $config['iat'] + 30; // not using before 30 sec
$config['exp'] = $config['iat'] + 1*3600*24; // valid for 1 day after generate