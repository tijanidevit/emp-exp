import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addEmployees,
  fetchEmployees,
} from "../../features/employees/employeesSlice";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Spinner from "../utilizies/Spinner";
import DepartmentOptions from "../departments/DepartmentOptions";
const AddEmployeeForm = () => {
  const dispatch = useDispatch();
  // const [requestStatus, setRequestStatus] = useState("idle");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const LoginSchema = Yup.object().shape({
    location: Yup.string().required("Location is required"),
    fullname: Yup.string().required("Fullname is required"),
    department_id: Yup.string().required("Department is required"),
    job_description: Yup.string()
      .required("Job Description is required")
      .max(200, "Job Description cannot be more than 200 charactersß"),
    profile_picture: Yup.mixed().required("Profile Picture is required"),
  });

  return (
    <div>
      <div className="d-flex justify-content-end">
        <button
          className="my-2 btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#myModal"
        >
          Add Employee
        </button>
      </div>
      <div className="modal custom-modal fade" id="myModal" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">Add New Employee</div>
              <div className="">
                <Formik
                  initialValues={{
                    fullname: "",
                    department_id: 0,
                    location: "",
                    job_description: "",
                    profile_picture: null,
                  }}
                  validationSchema={LoginSchema}
                  onSubmit={async (values, { resetForm }) => {
                    setSubmitting(true);
                    setMessage("");
                    let formData = new FormData();

                    /* append input field values to formData */
                    for (let value in values) {
                      formData.append(value, values[value]);
                    }
                    try {
                      try {
                        // setRequestStatus("pending");
                        let res = await dispatch(
                          addEmployees(formData)
                        ).unwrap();

                        if (res.status) {
                          setMessage("Employee added successfully!");
                          dispatch(fetchEmployees());
                          resetForm({ values: "" });
                        } else {
                          setMessage(res.message);
                        }
                        console.log("d");
                      } catch (error) {
                        console.error(error);
                      } finally {
                        // setRequestStatus("idle");
                      }
                    } catch (error) {
                      setMessage(error.message);
                    } finally {
                      setSubmitting(false);
                      // setRequestStatus("idle");
                    }
                  }}
                >
                  {({ errors, touched, setFieldValue }) => (
                    <Form method="post" encType="multipart/form-data">
                      {message !== "" && (
                        <div className="form-group">
                          <div className="alert alert-warning">{message}</div>
                        </div>
                      )}

                      <div className="form-group">
                        <label className="form-control-label">Fullname</label>
                        <Field
                          name="fullname"
                          type="text"
                          required
                          className="form-control"
                          id="fullname"
                        />
                        {errors.fullname && touched.fullname ? (
                          <div className="text-danger">{errors.fullname}</div>
                        ) : null}
                      </div>

                      <div className="form-group">
                        <label className="form-control-label">Department</label>
                        <div className="pass-group">
                          <Field
                            as="select"
                            required
                            className="form-control pass-input"
                            name="department_id"
                          >
                            <option value="" key=""></option>
                            <DepartmentOptions />
                          </Field>
                        </div>

                        {errors.department_id && touched.department_id ? (
                          <div className="text-danger">
                            {errors.department_id}
                          </div>
                        ) : null}
                      </div>

                      <div className="form-group">
                        <label className="form-control-label">Location</label>
                        <div className="pass-group">
                          <Field
                            type="text"
                            required
                            className="form-control pass-input"
                            name="location"
                          />
                        </div>

                        {errors.location && touched.location ? (
                          <div className="text-danger">{errors.location}</div>
                        ) : null}
                      </div>
                      <div className="form-group">
                        <label>Photo</label>

                        <input
                          id="profile_picture"
                          name="profile_picture"
                          type="file"
                          accept="image/*"
                          className="form-control"
                          onChange={(event) => {
                            setFieldValue(
                              "profile_picture",
                              event.currentTarget.files[0]
                            );
                          }}
                        />
                        {errors.profile_picture && touched.profile_picture ? (
                          <div className="text-danger">
                            {errors.profile_picture}
                          </div>
                        ) : null}
                      </div>

                      <div className="form-group">
                        <label className="form-control-label">
                          Job Description
                        </label>
                        <Field
                          name="job_description"
                          as="textarea"
                          required
                          className="form-control"
                          id="job_description"
                        />
                        {errors.job_description && touched.job_description ? (
                          <div className="text-danger">
                            {errors.job_description}
                          </div>
                        ) : null}
                      </div>
                      <button
                        className="btn btn-lg btn-block btn-primary w-100"
                        type="submit"
                      >
                        {submitting && <Spinner />}
                        Submit
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal custom-modal fade" id="myModal" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">Add New Employee</div>
              <div className="">
                <Formik
                  initialValues={{
                    fullname: "",
                    department_id: 0,
                    location: "",
                    job_description: "",
                    profile_picture: null,
                  }}
                  validationSchema={LoginSchema}
                  onSubmit={async (values, { resetForm }) => {
                    setSubmitting(true);
                    setMessage("");
                    let formData = new FormData();

                    /* append input field values to formData */
                    for (let value in values) {
                      formData.append(value, values[value]);
                    }
                    try {
                      try {
                        // setRequestStatus("pending");
                        let res = await dispatch(
                          addEmployees(formData)
                        ).unwrap();

                        if (res.status) {
                          setMessage("Employee added successfully!");
                          dispatch(fetchEmployees());
                          resetForm({ values: "" });
                        } else {
                          setMessage(res.message);
                        }
                        console.log("d");
                      } catch (error) {
                        console.error(error);
                      } finally {
                        // setRequestStatus("idle");
                      }
                    } catch (error) {
                      setMessage(error.message);
                    } finally {
                      setSubmitting(false);
                      // setRequestStatus("idle");
                    }
                  }}
                >
                  {({ errors, touched, setFieldValue }) => (
                    <Form method="post" encType="multipart/form-data">
                      {message !== "" && (
                        <div className="form-group">
                          <div className="alert alert-warning">{message}</div>
                        </div>
                      )}

                      <div className="form-group">
                        <label className="form-control-label">Fullname</label>
                        <Field
                          name="fullname"
                          type="text"
                          required
                          className="form-control"
                          id="fullname"
                        />
                        {errors.fullname && touched.fullname ? (
                          <div className="text-danger">{errors.fullname}</div>
                        ) : null}
                      </div>

                      <div className="form-group">
                        <label className="form-control-label">Department</label>
                        <div className="pass-group">
                          <Field
                            as="select"
                            required
                            className="form-control pass-input"
                            name="department_id"
                          >
                            <option value="" key=""></option>
                            <DepartmentOptions />
                          </Field>
                        </div>

                        {errors.department_id && touched.department_id ? (
                          <div className="text-danger">
                            {errors.department_id}
                          </div>
                        ) : null}
                      </div>

                      <div className="form-group">
                        <label className="form-control-label">Location</label>
                        <div className="pass-group">
                          <Field
                            type="text"
                            required
                            className="form-control pass-input"
                            name="location"
                          />
                        </div>

                        {errors.location && touched.location ? (
                          <div className="text-danger">{errors.location}</div>
                        ) : null}
                      </div>
                      <div className="form-group">
                        <label>Photo</label>

                        <input
                          id="profile_picture"
                          name="profile_picture"
                          type="file"
                          accept="image/*"
                          className="form-control"
                          onChange={(event) => {
                            setFieldValue(
                              "profile_picture",
                              event.currentTarget.files[0]
                            );
                          }}
                        />
                        {errors.profile_picture && touched.profile_picture ? (
                          <div className="text-danger">
                            {errors.profile_picture}
                          </div>
                        ) : null}
                      </div>

                      <div className="form-group">
                        <label className="form-control-label">
                          Job Description
                        </label>
                        <Field
                          name="job_description"
                          as="textarea"
                          required
                          className="form-control"
                          id="job_description"
                        />
                        {errors.job_description && touched.job_description ? (
                          <div className="text-danger">
                            {errors.job_description}
                          </div>
                        ) : null}
                      </div>
                      <button
                        className="btn btn-lg btn-block btn-primary w-100"
                        type="submit"
                      >
                        {submitting && <Spinner />}
                        Submit
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeForm;
