<?php    
    require APPPATH . 'libraries/REST_Controller.php';
    // require APPPATH.'vendor/autoload.php';

    class Employees extends REST_Controller{
        public function __construct()
        {
            parent::__construct();
            $this->load->model('employee_model');
            $this->load->library(['form_validation', 'cloudinarylib']);
        }


        function index_get()
        {
            $this->response([
                'status' => 'success',
                'message' => 'Employees API Connected successful.',
                'time_connected' => date('d-M-Y h:i:s'),
                'domain' => base_url()
            ], REST_Controller::HTTP_OK);
        }

        public function all_get(){
            $employees = $this->employee_model->fetch_employees();
                if (!empty($employees)) {
                    return $this->response([
                        'status' => 1,
                        'message' => 'Employee account fetched successfully',
                        'data' => $employees
                    ], parent::HTTP_OK);
                }
                else{
                    return $this->response([
                        'status' => 0,
                        'message' => 'There are no registered employees yet',
                    ], parent::HTTP_OK);
                }
        }

        public function create_post()
        {
            $this->form_validation->set_rules('fullname', 'Fullname', 'required');
            $this->form_validation->set_rules('job_description', 'Job Description', 'required');
            $this->form_validation->set_rules('location', 'Location', 'required');
            $this->form_validation->set_rules('department_id', 'Department', 'required');
            // $this->form_validation->set_rules('profile_picture', 'Profile Picture', 'required');

            if ($this->form_validation->run() === FALSE) {
                return $this->response([
                    'status' => 0,
                    'message' => "All inputs are required.",
                ], parent::HTTP_OK);
            }

            if (!empty($_FILES['profile_picture']['name'])) {
                $config['upload_path']   = APPPATH.'uploads/employees'; 

                $config['allowed_types'] = 'gif|jpg|png|jpeg'; 
                $config['max_size']      = 1024;

                $this->load->library('upload',$config);
                $this->upload->initialize($config);
                
                if($this->upload->do_upload('profile_picture')){
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
                'fullname' => $this->security->xss_clean($this->input->post('fullname')),
                'department_id' => $this->security->xss_clean($this->input->post('department_id')),
                'location' => $this->security->xss_clean($this->input->post('location')),
                'job_description' => $this->security->xss_clean($this->input->post('job_description')),
            ];
            $data['profile_picture'] =  $this->cloudinarylib->uploadImage(APPPATH.'uploads/employees/'.$uploadData['file_name']);
            unlink(APPPATH.'uploads/employees/'.$uploadData['file_name']);
            if ($this->employee_model->create_employee_account($data)) {
                return $this->response([
                    'status' => 1,
                    'message' => "Employee account created successfully.",
                ], parent::HTTP_OK);
            }
            else{
                return $this->response([
                    'status' => 0,
                    'message' => "Unable to create account.",
                ], parent::HTTP_INTERNAL_SERVER_ERROR);
            }
        }

        public function single_get($id)
        {
            $employee = $this->employee_model->fetch_employee($id);
            if (!empty($employee)) {
                return $this->response([
                    'status' => 1,
                    'message' => 'Employee account fetched successfully',
                    'data' => $employee
                ], parent::HTTP_OK);
            }
            else{
                return $this->response([
                    'status' => 0,
                    'message' => 'Employee account not found',
                ], parent::HTTP_OK);
            }
        }
    }

?>