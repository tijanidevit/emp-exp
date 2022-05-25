<?php    
    require APPPATH . 'libraries/REST_Controller.php';

    header('Accesss-Control-Allow-Origin: *');
    header('Accesss-Control-Allow-Methods: POST, GET, DELETE, PUT');

    class Vendors extends REST_Controller{
        public function __construct()
        {
            parent::__construct();
            $this->load->model('v1/vendor_model');
            $this->load->model('v1/images_file_manager_model');
            $this->load->library(['form_validation', 's3']);
        }


        function index_get()
        {
            $this->response([
                'status' => 'success',
                'message' => 'Vendors API Connected successful.',
                'time_connected' => date('d-M-Y h:i:s'),
                'domain' => base_url()
            ], REST_Controller::HTTP_OK);
        }

        public function create_shop_post()
        {
            try {
                $user_id = auth_user_id($this);
            } catch (Exception $ex) {
                return $this->response([
                    'status' => 0,
                    'message' => $ex->getMessage(),
                ], parent::HTTP_UNAUTHORIZED);
            }
            if (!$user_id) {
                return $this->response([
                    'status' => 0,
                    'message' => "Token expired. Please login to continue",
                ], parent::HTTP_UNAUTHORIZED);
            }

            if ($this->vendor_model->is_user_a_vendor($user_id)) {
                return $this->response([
                    'status' => 0,
                    'message' => "You have already created a shop",
                ], parent::HTTP_UNAUTHORIZED);
            }
            $this->form_validation->set_rules('shop_name', 'Shop name', 'required');
            $this->form_validation->set_rules('first_name', 'First name', 'required');
            $this->form_validation->set_rules('last_name', 'Last name', 'required');
            $this->form_validation->set_rules('phone_number', 'Phone number', 'required');
            $this->form_validation->set_rules('country_id', 'Country', 'required');
            $this->form_validation->set_rules('state_id', 'State', 'required');
            $this->form_validation->set_rules('city_id', 'City', 'required');
            $this->form_validation->set_rules('about_me', 'About', 'required');

            if (!isset($_FILES['files']['name']) || empty($_FILES['files']['name'])) {
                return $this->response([
                    'status' => 0,
                    'message' => "Please upload identity images.",
                ], parent::HTTP_BAD_REQUEST);
            }

            if ($this->form_validation->run() === FALSE) {
                return $this->response([
                    'status' => 0,
                    'message' => "All inputs are required.",
                ], parent::HTTP_BAD_REQUEST);
            }

            $data = array(
                'shop_name' => remove_special_characters($this->input->post('shop_name', true)),
                'first_name' => $this->security->xss_clean($this->input->post('first_name', true)),
                'last_name' => $this->security->xss_clean($this->input->post('last_name', true)),
                'phone_number' => $this->security->xss_clean($this->input->post('phone_number', true)),
                'country_id' => $this->security->xss_clean($this->input->post('country_id', true)),
                'state_id' => $this->security->xss_clean($this->input->post('state_id', true)),
                'city_id' => $this->security->xss_clean($this->input->post('city_id', true)),
                'about_me' => $this->security->xss_clean($this->input->post('about_me', true)),
                'is_active_shop_request' => 1,
            );
            
            if (!$this->vendor_model->is_unique_shop_name($data['shop_name'], $user_id)) {
                return $this->response([
                    'status' => 0,
                    'message' => 'Shop name has been used already. Please use a unique name',
                ], parent::HTTP_CONFLICT);  
            }
            
            if (!$this->vendor_model->request_shop_creation($data, $user_id)) {
                return $this->response([
                    'status' => 0,
                    'message' => 'Unable to request shop creation. Please try again or contact support',
                ], parent::HTTP_CONFLICT);  
            }

            $countfiles = count($_FILES['files']['name']);
            for($i=0;$i<$countfiles;$i++){
                $file = [
                    'name' => $_FILES['files']['name'][$i],
                    'tmp_name' => $_FILES['files']['tmp_name'][$i],
                ];
                $file_url = $this->s3->upload_image('identity', $file);
                
                $this->images_file_manager_model->add_new_image($user_id, $file_url);
            }
            return $this->response([
                'status' => 1,
                'message' => 'Shop opening request sent successfully. Await approval soon',
            ], parent::HTTP_OK);
        }

        public function all_ads_get()
        {
            try {
                $user_id = auth_user_id($this);
            } catch (Exception $ex) {
                return $this->response([
                    'status' => 0,
                    'message' => $ex->getMessage(),
                ], parent::HTTP_UNAUTHORIZED);
            }
            if (!$user_id) {
                return $this->response([
                    'status' => 0,
                    'message' => "Token expired. Please login to continue",
                ], parent::HTTP_UNAUTHORIZED);
            }

            if (!$this->vendor_model->is_user_a_vendor($user_id)) {
                return $this->response([
                    'status' => 0,
                    'message' => "Account not a vendor account. Please create a shop or await approval",
                ], parent::HTTP_UNAUTHORIZED);
            }

            $ads = $this->vendor_model->fetch_vendor_ads($user_id);
            
            if (!$ads) {
                return $this->response([
                    'status' => 0,
                    'message' => 'You have no ads',
                ], parent::HTTP_CONFLICT);  
            }

            return $this->response([
                'status' => 1,
                'message' => 'All ads fetched successfully.',
                'data' => $ads
            ], parent::HTTP_OK);
        }

        public function pending_ads_get()
        {
            try {
                $user_id = auth_user_id($this);
            } catch (Exception $ex) {
                return $this->response([
                    'status' => 0,
                    'message' => $ex->getMessage(),
                ], parent::HTTP_UNAUTHORIZED);
            }
            if (!$user_id) {
                return $this->response([
                    'status' => 0,
                    'message' => "Token expired. Please login to continue",
                ], parent::HTTP_UNAUTHORIZED);
            }

            if (!$this->vendor_model->is_user_a_vendor($user_id)) {
                return $this->response([
                    'status' => 0,
                    'message' => "Account not a vendor account. Please create a shop or await approval",
                ], parent::HTTP_UNAUTHORIZED);
            }

            $pending_ads = $this->vendor_model->fetch_vendor_pending_ads($user_id);
            
            if (!$pending_ads) {
                return $this->response([
                    'status' => 0,
                    'message' => 'You have no pending ads',
                ], parent::HTTP_CONFLICT);  
            }

            return $this->response([
                'status' => 1,
                'message' => 'Pending ads fetched successfully.',
                'data' => $pending_ads
            ], parent::HTTP_OK);
        }

        public function approved_ads_get()
        {
            try {
                $user_id = auth_user_id($this);
            } catch (Exception $ex) {
                return $this->response([
                    'status' => 0,
                    'message' => $ex->getMessage(),
                ], parent::HTTP_UNAUTHORIZED);
            }
            if (!$user_id) {
                return $this->response([
                    'status' => 0,
                    'message' => "Token expired. Please login to continue",
                ], parent::HTTP_UNAUTHORIZED);
            }

            if (!$this->vendor_model->is_user_a_vendor($user_id)) {
                return $this->response([
                    'status' => 0,
                    'message' => "Account not a vendor account. Please create a shop or await approval",
                ], parent::HTTP_UNAUTHORIZED);
            }

            $approved_ads = $this->vendor_model->fetch_vendor_approved_ads($user_id);
            
            if (!$approved_ads) {
                return $this->response([
                    'status' => 0,
                    'message' => 'You have no approved ads',
                ], parent::HTTP_CONFLICT);  
            }

            return $this->response([
                'status' => 1,
                'message' => 'Approved ads fetched successfully.',
                'data' => $approved_ads
            ], parent::HTTP_OK);
        }

        public function hidden_ads_get()
        {
            try {
                $user_id = auth_user_id($this);
            } catch (Exception $ex) {
                return $this->response([
                    'status' => 0,
                    'message' => $ex->getMessage(),
                ], parent::HTTP_UNAUTHORIZED);
            }
            if (!$user_id) {
                return $this->response([
                    'status' => 0,
                    'message' => "Token expired. Please login to continue",
                ], parent::HTTP_UNAUTHORIZED);
            }

            if (!$this->vendor_model->is_user_a_vendor($user_id)) {
                return $this->response([
                    'status' => 0,
                    'message' => "Account not a vendor account. Please create a shop or await approval",
                ], parent::HTTP_UNAUTHORIZED);
            }

            $hidden_ads = $this->vendor_model->fetch_vendor_hidden_ads($user_id);
            
            if (!$hidden_ads) {
                return $this->response([
                    'status' => 0,
                    'message' => 'You have no hidden ads',
                ], parent::HTTP_CONFLICT);  
            }

            return $this->response([
                'status' => 1,
                'message' => 'Hidden ads fetched successfully.',
                'data' => $hidden_ads
            ], parent::HTTP_OK);
        }
    }

?>