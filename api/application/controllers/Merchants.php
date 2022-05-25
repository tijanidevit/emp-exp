<?php    
    require APPPATH . 'libraries/REST_Controller.php';


    class Merchants extends REST_Controller{
        public function __construct()
        {
            parent::__construct();
            $this->load->model('general_model');
        }


        function index_get()
        {
            $this->response([
                'status' => 'success',
                'message' => 'Merchants API Connected successful.',
                'time_connected' => date('d-M-Y h:i:s'),
                'domain' => base_url()
            ], REST_Controller::HTTP_OK);
        }

        public function all_get(){
            $merchants = $this->general_model->fetch_merchants();
            if (!empty($merchants)) {
                return $this->response([
                    'status' => 1,
                    'message' => 'Merchants fetched successfully',
                    'data' => $merchants
                ], parent::HTTP_OK);
            }
            else{
                return $this->response([
                    'status' => 0,
                    'message' => 'There are no registered merchants yet',
                ], parent::HTTP_OK);
            }
        }
    }

?>