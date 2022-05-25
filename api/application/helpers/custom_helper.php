<?php defined('BASEPATH') or exit('No direct script access allowed');
/*
 * Custom Helpers
 *
 */

if (strpos($_SERVER['REQUEST_URI'], '/index.php') !== false) {
    $ci =& get_instance();
    $ci->load->helper('url');
    redirect(current_url());
    exit();
}

//current full url
if (!function_exists('current_full_url')) {
    function current_full_url()
    {
        $current_url = current_url();
        if (!empty($_SERVER['QUERY_STRING'])) {
            $current_url = $current_url . "?" . $_SERVER['QUERY_STRING'];
        }
        return $current_url;
    }
}

//post method
if (!function_exists('post_method')) {
    function post_method()
    {
        $ci =& get_instance();
        if ($ci->input->method(FALSE) != 'post') {
            exit();
        }
    }
}

//get method
if (!function_exists('get_method')) {
    function get_method()
    {
        $ci =& get_instance();
        if ($ci->input->method(FALSE) != 'get') {
            exit();
        }
    }
}

//get
if (!function_exists('input_get')) {
    function input_get($input_name)
    {
        $ci =& get_instance();
        return clean_str($ci->input->get($input_name, true));
    }
}

//unserialize data
if (!function_exists('unserialize_data')) {
    function unserialize_data($serialized_data)
    {
        $data = @unserialize($serialized_data);
        if (empty($data) && preg_match('/^[aOs]:/', $serialized_data)) {
            $serialized_data = preg_replace_callback('/s\:(\d+)\:\"(.*?)\";/s', function ($matches) {
                return 's:' . strlen($matches[2]) . ':"' . $matches[2] . '";';
            }, $serialized_data);
            $data = @unserialize($serialized_data);
        }
        return $data;
    }
}

//check auth
if (!function_exists('lang_base_url')) {
    function lang_base_url()
    {
        return base_url();
    }
}

//check auth
// if (!function_exists('auth_check')) {
//     function auth_check()
//     {

//         return (auth_user($this));
//     }
// }


?>
