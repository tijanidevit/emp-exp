<?php
// Require 'authorization_helper.php';

function getAuthUser($token)
{
    return authorization::validateToken($token);
}

//$rest_obj is any REST_CONTROLLER obj or its Sub Classes obj (controllers)
function auth_user($rest_obj)
{
    
    try {
        $token = $rest_obj->_getHeaderAuthorization();
        if (!$token) {
            return false;
        }
        $user = getAuthUser($token);

        if ($user) {
            $user = $user->data;
            return $user;
        }
        else{
            return false;
        }
    } catch (Exception $ex) {
        return $ex->getMessage();
    }
}

function auth_user_id($rest_obj)
{
    $user = auth_user($rest_obj);
    if ($user) {
        return $user->id;
    }
    return false;
}