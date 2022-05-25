<?php    
    require APPPATH . 'libraries/REST_Controller.php';

    header('Accesss-Control-Allow-Origin: *');
    header('Accesss-Control-Allow-Methods: POST, GET, DELETE, PUT');

    class Orders extends REST_Controller{
        public function __construct()
        {
            parent::__construct();
            $this->load->model(['product_model','order_model','user_model']);
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

            $this->form_validation->set_rules('buyer_id', 'buyer', 'required');
            $this->form_validation->set_rules('seller_id', 'seller', 'required');
            $this->form_validation->set_rules('amount', 'Amount', 'required');
            $this->form_validation->set_rules('product_id', 'Product', 'required');
           
            if ($this->form_validation->run() === FALSE) {
                return $this->response([
                    'status' => 0,
                    'message' => "All inputs are required.",
                ], parent::HTTP_BAD_REQUEST);
            }
            $data = array(
                'buyer_id' => remove_special_characters($this->input->post('buyer_id', true)),
                'seller_id' => remove_special_characters($this->input->post('seller_id', true)),
                'product_id' => remove_special_characters($this->input->post('product_id', true)),
                'amount' => $this->security->xss_clean($this->input->post('amount', true)),
                'status' => 'pending',
                'token' => rand(111111,999999)
            );
            $buyer_id = $data['buyer_id'];
            $seller_id = $data['seller_id'];
            $product_id = $data['product_id'];

            if (!$this->user_model->check_user_existence($buyer_id)) {
                return $this->response([
                    'status' => 0,
                    'message' => "Buyer account not created yet.",
                ], parent::HTTP_OK);
            }

            if (!$this->user_model->check_user_existence($seller_id)) {
                return $this->response([
                    'status' => 0,
                    'message' => "Seller account not created yet.",
                ], parent::HTTP_OK);
            }

            if (!$this->product_model->check_product_existence($product_id)) {
                return $this->response([
                    'status' => 0,
                    'message' => "Escrow product not found.",
                ], parent::HTTP_OK);
            }

            $create_order = $this->order_model->add_order($data);
            
            if (!$create_order) {
                return $this->response([
                    'status' => 0,
                    'message' => 'Unable to create escrow order. Please try again or contact support',
                ], parent::HTTP_CONFLICT);  
            }
            else{
                return $this->response([
                    'status' => 1,
                    'message' => 'Escrow order created successfully.',
                ], parent::HTTP_OK);
            }
        }

        public function all_get()
        {
            $orders = $this->order_model->fetch_all_orders();

            if (empty($orders)) {
                return $this->response([
                    'status' => 0,
                    'message' => 'No orders added yet',
                ], parent::HTTP_OK);    
            }

            return $this->response([
                'status' => 1,
                'message' => 'Orders fetched successfully',
                'data' => $orders
            ], parent::HTTP_OK);  
            
        }

        public function single_get($order_id)
        {
            $order = $this->order_model->fetch_order($order_id);

            if (empty($order)) {
                return $this->response([
                    'status' => 0,
                    'message' => 'Order not found',
                ], parent::HTTP_OK);    
            }

            return $this->response([
                'status' => 1,
                'message' => 'Order fetched successfully',
                'data' => $order
            ], parent::HTTP_OK);  
        }

    }

?>