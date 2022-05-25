<?php    
    require APPPATH . 'libraries/REST_Controller.php';
    // require APPPATH.'vendor/autoload.php';

    class Expenses extends REST_Controller{
        public function __construct()
        {
            parent::__construct();
            $this->load->model('expense_model');
            $this->load->library(['form_validation', 'cloudinarylib']);
        }


        function index_get()
        {
            $this->response([
                'status' => 'success',
                'message' => 'Expenses API Connected successful.',
                'time_connected' => date('d-M-Y h:i:s'),
                'domain' => base_url()
            ], REST_Controller::HTTP_OK);
        }

        public function all_get(){
            $expenses = $this->expense_model->fetch_expenses();
                if (!empty($expenses)) {
                    return $this->response([
                        'status' => 1,
                        'message' => 'Expense fetched successfully',
                        'data' => $expenses
                    ], parent::HTTP_OK);
                }
                else{
                    return $this->response([
                        'status' => 0,
                        'message' => 'There are no registered expenses yet',
                    ], parent::HTTP_OK);
                }
        }

        public function create_post()
        {
            $this->form_validation->set_rules('date', 'Date', 'required');
            $this->form_validation->set_rules('comment', 'Comment', 'required');
            $this->form_validation->set_rules('employee_id', 'Employee', 'required');
            $this->form_validation->set_rules('merchant_id', 'Merchant', 'required');
            $this->form_validation->set_rules('amount', 'Amount', 'required');

            if ($this->form_validation->run() === FALSE) {
                return $this->response([
                    'status' => 0,
                    'message' => "All inputs are required.",
                ], parent::HTTP_OK);
            }

            if (!empty($_FILES['receipt']['name'])) {
                $config['upload_path']   = APPPATH.'uploads'; 

                $config['allowed_types'] = 'gif|jpg|png|jpeg'; 
                $config['max_size']      = 1024;

                $this->load->library('upload',$config);
                $this->upload->initialize($config);
                
                if($this->upload->do_upload('receipt')){
                    $uploadData = $this->upload->data();
                }else{
                    return $this->response([
                        'status' => 0,
                        'message' => "Image unable to upload " .$this->upload->display_errors(),
                    ], parent::HTTP_OK);
                }
            }
            else{
                return $this->response([
                    'status' => 0,
                    'message' => "Please upload image file.",
                ], parent::HTTP_OK);
            }

            $data = [
                'amount' => $this->security->xss_clean($this->input->post('amount')),
                'date' => $this->security->xss_clean($this->input->post('date')),
                'merchant_id' => $this->security->xss_clean($this->input->post('merchant_id')),
                'employee_id' => $this->security->xss_clean($this->input->post('employee_id')),
                'comment' => $this->security->xss_clean($this->input->post('comment')),
            ];
            $data['receipt'] =  $this->cloudinarylib->uploadImage(APPPATH.'uploads/'.$uploadData['file_name']);
            unlink(APPPATH.'uploads/'.$uploadData['file_name']);
            if ($this->expense_model->add_expense($data)) {
                return $this->response([
                    'status' => 1,
                    'message' => "Expense created successfully.",
                ], parent::HTTP_OK);
            }
            else{
                return $this->response([
                    'status' => 0,
                    'message' => "Unable to create expense.",
                ], parent::HTTP_INTERNAL_SERVER_ERROR);
            }
        }

        public function single_get($id)
        {
            $expense = $this->expense_model->fetch_expense($id);
            if (!empty($expense)) {
                return $this->response([
                    'status' => 1,
                    'message' => 'Expense fetched successfully',
                    'data' => $expense
                ], parent::HTTP_OK);
            }
            else{
                return $this->response([
                    'status' => 0,
                    'message' => 'Expense not found',
                ], parent::HTTP_OK);
            }
        }
    }

?>