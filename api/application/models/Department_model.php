<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Department_model extends CI_Model
{
    private $languages = [];
    public function __construct()
    {
        parent::__construct();
        $this->languages = (object) $this->languages();
        $this->load->model(['general_model']);
        $this->load->database();
    }
    
    //fetch all departments
    public function fetch_departments()
    {
        $this->db->order_by('departments.department');
        $query = $this->db->get('departments');
        $departments = $query->result();

        return $departments;
    }
}