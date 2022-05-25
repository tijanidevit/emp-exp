<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Cloudinarylib {

    public function __construct()
    {

        // include the cloudinary library within the dummy class
        require('cloudinary/src/Cloudinary.php');
        require 'cloudinary/src/Uploader.php';
        require 'cloudinary/src/Api.php';

        // configure Cloudinary API connection
        \Cloudinary::config(array(
            "cloud_name" => "tijanicloud",
            "api_key" => "342426213546891",
            "api_secret" => "tt__2L5xXGl81yoeVRNz50v2CYo"
        ));
    }

    public function uploadImage($image)
    {
        $file = \Cloudinary\Uploader::upload($image);
        return $file['url'];
    }
}