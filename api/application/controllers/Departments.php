<?php    
    require APPPATH . 'libraries/REST_Controller.php';


    class Departments extends REST_Controller{
        public function __construct()
        {
            parent::__construct();
            $this->load->model('department_model');
        }


        function index_get()
        {
            $this->response([
                'status' => 'success',
                'message' => 'Departments API Connected successful.',
                'time_connected' => date('d-M-Y h:i:s'),
                'domain' => base_url()
            ], REST_Controller::HTTP_OK);
        }

        public function all_get(){
            $departments = $this->department_model->fetch_departments();
            if (!empty($departments)) {
                return $this->response([
                    'status' => 1,
                    'message' => 'Departments fetched successfully',
                    'data' => $departments
                ], parent::HTTP_OK);
            }
            else{
                return $this->response([
                    'status' => 0,
                    'message' => 'There are no registered departments yet',
                ], parent::HTTP_OK);
            }
        }
    }

?>