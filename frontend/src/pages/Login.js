import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constants";
import axios from "axios";
import { Spinner } from "../components";

const Login = () => {
  const [pwd, setPwd] = useState(false);
  const [message, setMessage] = useState("");
  const [userToken, setUserToken] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userToken !== true) {
      setUserToken(localStorage.getItem("userToken"));
      if (userToken !== undefined && userToken !== null) {
        navigate("dashboard");
      }
    }
  }, [userToken, navigate]);

  // console.log("userToken", userToken);

  const LoginSchema = Yup.object().shape({
    password: Yup.string().required("Password is required"),
    username: Yup.string().required("Username is required"),
  });
  return (
    <div>
      <div className="main-wrapper login-body">
        <div className="login-wrapper">
          <div className="container">
            <img
              className="img-fluid logo-dark mb-2"
              src="assets/img/logo.png"
              alt="Logo"
            />
            <div className="loginbox">
              <div className="login-right">
                <div className="login-right-wrap">
                  <h1>Login</h1>
                  <p className="account-subtitle">Access to your dashboard</p>
                  <Formik
                    initialValues={{
                      username: "",
                      password: "",
                    }}
                    validationSchema={LoginSchema}
                    onSubmit={async (values) => {
                      setSubmitting(true);
                      let formData = new FormData();

                      /* append input field values to formData */
                      for (let value in values) {
                        formData.append(value, values[value]);
                      }
                      try {
                        const res = await axios.post(
                          API_URL + "admin/login",
                          formData
                        );

                        let output = res.data;
                        if (output.status) {
                          localStorage.setItem("userToken", true);
                          navigate("dashboard");
                        } else {
                          setMessage(output.message);
                        }
                      } catch (error) {
                        setMessage(error.message);
                      } finally {
                        setSubmitting(false);
                      }
                    }}
                  >
                    {({ errors, touched }) => (
                      <Form>
                        {message !== "" && (
                          <div className="form-group">
                            <div className="alert alert-warning">{message}</div>
                          </div>
                        )}

                        <div className="form-group">
                          <label className="form-control-label">Username</label>
                          <Field
                            name="username"
                            type="text"
                            required
                            className="form-control"
                            id="username"
                          />
                          {errors.username && touched.username ? (
                            <div className="text-danger">{errors.username}</div>
                          ) : null}
                        </div>
                        <div className="form-group">
                          <label className="form-control-label">Password</label>
                          <div className="pass-group">
                            <Field
                              type={`${pwd ? "text" : "password"}`}
                              required
                              className="form-control pass-input"
                              name="password"
                            />

                            <span
                              onClick={() => setPwd(!pwd)}
                              className={`fas ${
                                pwd ? "fa-eye-slash" : "fa-eye"
                              }  toggle-password`}
                            ></span>
                          </div>

                          {errors.password && touched.password ? (
                            <div className="text-danger">{errors.password}</div>
                          ) : null}
                        </div>
                        <div className="form-group">
                          <div className="row">
                            <div className="col-6">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="cb1"
                                />
                                <label
                                  checked
                                  className="custom-control-label"
                                  htmlFor="cb1"
                                >
                                  Remember me
                                </label>
                              </div>
                            </div>
                            <div className="col-6 text-end">
                              <a
                                className="forgot-link"
                                href="forgot-password.html"
                              >
                                Forgot Password ?
                              </a>
                            </div>
                          </div>
                        </div>
                        <button
                          className="btn btn-lg btn-block btn-primary w-100"
                          type="submit"
                        >
                          {submitting && <Spinner />}
                          Login
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
    </div>
  );
};

export default Login;
