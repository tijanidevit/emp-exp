<?php    
    require APPPATH . 'libraries/REST_Controller.php';

    class Admin extends REST_Controller{
        public function __construct()
        {
            parent::__construct();
            $this->load->model('admin_model');
            $this->load->library(['form_validation']);
        }


        function index_get()
        {
            $this->response([
                'status' => 'success',
                'message' => 'Admin API Connected successful.',
                'time_connected' => date('d-M-Y h:i:s'),
                'domain' => base_url()
            ], REST_Controller::HTTP_OK);
        }

        public function login_post()
        {
            $this->form_validation->set_rules('username', 'Username', 'required');
            $this->form_validation->set_rules('password', 'Password', 'required');

            if ($this->form_validation->run() === FALSE) {
                return $this->response([
                    'status' => 0,
                    'message' => "Username and Password required",
                ], parent::HTTP_OK);
            }

            $username = $this->security->xss_clean($this->input->post('username'));
            $password = $this->security->xss_clean($this->input->post('password'));
            $admin = $this->admin_model->fetch_admin($username);
            if (empty($admin)) {
                return $this->response([
                    'status' => 0,
                    'message' => 'Username not recognised',
                    'data' => $admin
                ], parent::HTTP_OK);
            }

            if (md5($password) != $admin->password) {
                return $this->response([
                    'status' => 0,
                    'message' => 'Invalid Password',
                    'data' => $admin
                ], parent::HTTP_OK);
            }
                
            return $this->response([
                'status' => 1,
                'message' => 'Login Successful',
            ], parent::HTTP_OK);
        }
    }

?>