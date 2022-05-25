<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Admin_model extends CI_Model
{
    public function __construct()
    {
        $this->load->database();
    }

    public function fetch_admin($username)
    {        
        $this->db->where('username', $username);
        $query = $this->db->get('admin');
        $admin = $query->row();
        return $admin;
    }

}
