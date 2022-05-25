<?php if (!defined('BASEPATH')) exit('No direct script access allowed');


require_once 'vendor/autoload.php';

use Cloudinary\Cloudinary;
use Cloudinary\Uploader;
use Cloudinary\API;

class CD {
    private $cd;
    private $default_bucket_name = 'testing123is';
    public function __construct()
    {
        // $Cloud = new Cloudinary();
        Cloudinary::config(array(
            "cloud_name" => "tijanicloud",
            "api_key" => "342426213546891",
            "api_secret" => 'tt__2L5xXGl81yoeVRNz50v2CYo'
        ));
    }

    public function upload_image($file)
    {
        
        $image = UploadedFile::getInstanceByName($file);

        $cloudinaryImage = Uploader::upload($image->tempName);

        return ($cloudinaryImage->url);
    }
}