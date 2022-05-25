import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addExpenses,
  fetchExpenses,
} from "../../features/expenses/expensesSlice";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Spinner from "../utilizies/Spinner";
import EmployeeOptions from "../employees/EmployeeOptions";
import MerchantOptions from "../merchants/MerchantOptions";
const AddExpenseForm = () => {
  const dispatch = useDispatch();
  // const [requestStatus, setRequestStatus] = useState("idle");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const ExpenseSchema = Yup.object().shape({
    amount: Yup.string().required("Amount is required"),
    date: Yup.date().required("Date is required"),
    merchant_id: Yup.string().required("Merchant is required"),
    employee_id: Yup.string().required("Employee is required"),
    comment: Yup.string()
      .required("Job Description is required")
      .max(200, "Job Description cannot be more than 200 charactersß"),
    receipt: Yup.mixed().required("Profile Picture is required"),
  });

  return (
    <div>
      <div className="d-flex justify-content-end">
        <button
          className="my-2 btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#myModal"
        >
          Add Expense
        </button>
      </div>

      <div className="modal custom-modal fade" id="myModal" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <div className="form-header">Add New Expense</div>
              <div className="">
                <Formik
                  initialValues={{
                    merchant_id: "",
                    employee_id: 0,
                    amount: "",
                    comment: "",
                    date: "",
                    receipt: null,
                  }}
                  validationSchema={ExpenseSchema}
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
                          addExpenses(formData)
                        ).unwrap();

                        if (res.status) {
                          setMessage("Expense added successfully!");
                          dispatch(fetchExpenses());
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
                        <label className="form-control-label">Date</label>
                        <Field
                          name="date"
                          type="date"
                          required
                          className="form-control"
                          id="date"
                        />
                        {errors.date && touched.date ? (
                          <div className="text-danger">{errors.date}</div>
                        ) : null}
                      </div>

                      <div className="form-group">
                        <label className="form-control-label">Employee</label>
                        <div className="pass-group">
                          <Field
                            as="select"
                            required
                            className="form-control pass-input"
                            name="employee_id"
                          >
                            <option value="" key=""></option>
                            <EmployeeOptions />
                          </Field>
                        </div>

                        {errors.employee_id && touched.employee_id ? (
                          <div className="text-danger">
                            {errors.employee_id}
                          </div>
                        ) : null}
                      </div>

                      <div className="form-group">
                        <label className="form-control-label">Merchant</label>
                        <div className="pass-group">
                          <Field
                            as="select"
                            required
                            className="form-control pass-input"
                            name="merchant_id"
                          >
                            <option value="" key=""></option>
                            <MerchantOptions />
                          </Field>
                        </div>

                        {errors.merchant_id && touched.merchant_id ? (
                          <div className="text-danger">
                            {errors.merchant_id}
                          </div>
                        ) : null}
                      </div>

                      <div className="form-group">
                        <label className="form-control-label">Amount</label>
                        <div className="pass-group">
                          <Field
                            type="text"
                            required
                            className="form-control pass-input"
                            name="amount"
                          />
                        </div>

                        {errors.amount && touched.amount ? (
                          <div className="text-danger">{errors.amount}</div>
                        ) : null}
                      </div>
                      <div className="form-group">
                        <label>Photo</label>

                        <input
                          id="receipt"
                          name="receipt"
                          type="file"
                          accept="image/*"
                          className="form-control"
                          onChange={(event) => {
                            setFieldValue(
                              "receipt",
                              event.currentTarget.files[0]
                            );
                          }}
                        />
                        {errors.receipt && touched.receipt ? (
                          <div className="text-danger">{errors.receipt}</div>
                        ) : null}
                      </div>

                      <div className="form-group">
                        <label className="form-control-label">Comment</label>
                        <Field
                          name="comment"
                          as="textarea"
                          required
                          className="form-control"
                          id="comment"
                        />
                        {errors.comment && touched.comment ? (
                          <div className="text-danger">{errors.comment}</div>
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

export default AddExpenseForm;
