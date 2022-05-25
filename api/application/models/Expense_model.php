<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Expense_model extends CI_Model
{
    private $languages = [];
    public function __construct()
    {
        parent::__construct();
        $this->languages = (object) $this->languages();
        $this->load->model(['general_model']);
        $this->load->database();
    }
    
    //fetch all expenses
    public function fetch_expenses()
    {
        $this->db->order_by('expenses.id DESC');
        $query = $this->db->get('expenses');
        $expenses = $query->result();

        foreach ($expenses as $expense ) {
            $expense->employee = $this->general_model->fetch_employee($expense->employee_id)->fullname;
            $expense->merchant = $this->general_model->fetch_merchant($expense->merchant_id)->merchant;
        }

        return $expenses;
    }

    //fetch single expenses
    public function fetch_expense($id)
    {
        $this->db->where('id', $id);
        $query = $this->db->get('expenses');
        $expense = $query->row();
        $expense->employee = $this->general_model->fetch_user($expense->employee_id);
        return $expense;
    }

    //add expenses
    public function add_expense($data)
    {
        return $this->db->insert('expenses', $data);
    }
}