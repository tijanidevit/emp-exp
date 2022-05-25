<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Employee_model extends CI_Model
{
    public function __construct()
    {
        $this->load->database();
    }

    public function fetch_employees(){
        $this->db->order_by('fullname asc');
        $query = $this->db->get('employees');
        $employees = $query->result();
        foreach ($employees as $employee) {
            $employee->department = $this->_fetch_employee_department($employee->department_id);
        }
        return $employees;
    }


    public function fetch_employee($id)
    {        
        $this->db->where('id', $id);
        $query = $this->db->get('employees');
        $employee = $query->row();
        if ($employee) {
            $employee->expenses = $this->_fetch_employee_expenses($id);
            $employee->department = $this->_fetch_employee_department($employee->department_id);
        }
        return $employee;
    }


    public function create_employee_account($data)
    {
        return $this->db->insert('employees', $data);
    }


    public function _fetch_employee_expenses($employee_id)
    {
        $this->db->where(['employee_id' => $employee_id]);
        $this->db->order_by('id DESC');
        $query = $this->db->get('expenses');
        return $query->result();
    }
    public function _fetch_employee_department($department_id)
    {
        $this->db->where(['id' => $department_id]);
        $query = $this->db->get('departments');
        return $query->row();
    }

}
