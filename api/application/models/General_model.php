<?php
defined('BASEPATH') or exit('No direct script access allowed');

class General_model extends CI_Model
{
    public function __construct()
    {
        $this->load->database();
    }

    public function fetch_employee($employee_id)
    {        
        $this->db->where('id', $employee_id);
        $query = $this->db->get('employees');
        $employee = $query->row();
        return $employee;
    }
    public function fetch_merchant($merchant_id)
    {        
        $this->db->where('id', $merchant_id);
        $query = $this->db->get('merchants');
        $merchant = $query->row();
        return $merchant;
    }

    public function fetch_merchants()
    {        
        $this->db->order_by('merchant');
        $query = $this->db->get('merchants');
        $merchant = $query->result();
        return $merchant;
    }


}