<?php    
    require APPPATH . 'libraries/REST_Controller.php';

    header('Accesss-Control-Allow-Origin: *');
    header('Accesss-Control-Allow-Methods: POST, GET, DELETE, PUT');

    class Products extends REST_Controller{
        public function __construct()
        {
            parent::__construct();
            $this->load->model(['product_model','user_model']);
            $this->load->library(['form_validation']);
        }


        function index_get()
        {
            $this->response([
                'status' => 'success',
                'message' => 'Auth API Connected successful.',
                'time_connected' => date('d-M-Y h:i:s'),
                'domain' => base_url()
            ], REST_Controller::HTTP_OK);
        }

        public function new_post()
        {

            $this->form_validation->set_rules('user_id', 'User', 'required');
            $this->form_validation->set_rules('title', 'Title', 'required');
            $this->form_validation->set_rules('amount', 'Amount', 'required');
            $this->form_validation->set_rules('product_id', 'Product', 'required');
           
            if ($this->form_validation->run() === FALSE) {
                return $this->response([
                    'status' => 0,
                    'message' => "All inputs are required.",
                ], parent::HTTP_BAD_REQUEST);
            }

            $data = array(
                'user_id' => remove_special_characters($this->input->post('user_id', true)),
                'product_id' => remove_special_characters($this->input->post('product_id', true)),
                'title' => $this->security->xss_clean($this->input->post('title', true)),
                'amount' => $this->security->xss_clean($this->input->post('amount', true)),
            );
            $user_id = $data['user_id'];
            $product_id = $data['product_id'];

            if (!$this->user_model->check_user_existence($user_id)) {
                return $this->response([
                    'status' => 0,
                    'message' => "Escrow account not created yet.",
                ], parent::HTTP_OK);
            }

            if ($this->product_model->check_user_product_existence($user_id, $product_id)) {
                return $this->response([
                    'status' => 0,
                    'message' => "Escrow product already added.",
                ], parent::HTTP_OK);
            }

            $create_product = $this->product_model->add_product($data);
            
            if (!$create_product) {
                return $this->response([
                    'status' => 0,
                    'message' => 'Unable to create escrow product. Please try again or contact support',
                ], parent::HTTP_CONFLICT);  
            }
            else{
                return $this->response([
                    'status' => 1,
                    'message' => 'Escrow product created successfully.',
                ], parent::HTTP_OK);
            }
        }

        public function all_get()
        {
            $products = $this->product_model->fetch_all_products();

            if (empty($products)) {
                return $this->response([
                    'status' => 0,
                    'message' => 'No products added yet',
                ], parent::HTTP_OK);    
            }

            return $this->response([
                'status' => 1,
                'message' => 'Products fetched successfully',
                'data' => $products
            ], parent::HTTP_OK);  
            
        }

        public function single_get($product_id)
        {
            $product = $this->product_model->fetch_product($product_id);

            if (empty($product)) {
                return $this->response([
                    'status' => 0,
                    'message' => 'Product not found',
                ], parent::HTTP_OK);    
            }

            return $this->response([
                'status' => 1,
                'message' => 'Product fetched successfully',
                'data' => $product
            ], parent::HTTP_OK);  
        }

    }

?>