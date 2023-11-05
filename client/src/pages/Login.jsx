import React, { useContext } from "react";
import NavBar from "../components/NavBar";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/url";

const Login = () => {
  const navigate = useNavigate();
  const { loading, error, dispatch } = useContext(AuthContext);
  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center h-[70vh]">
        <div className="w-[400px] flex flex-col gap-4">
          <h1 className="text-2xl text-Oxford-Blue font-extrabold text-center">
            Register
          </h1>
          <div>
            <Formik
              initialValues={{
                username: "",
                password: "",
              }}
              validate={(values) => {
                const errors = {};
                if (!values.username) {
                  errors.username = "Username is required";
                }
                if (!values.password) {
                  errors.password = "Password is required";
                }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                dispatch({ type: "LOGIN_START" });
                try {
                  const res = await axios.post(`${BASE_URL}/api/auth/login`, values);
                  dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: res.data.details,
                  });
                  navigate("/");
                } catch (err) {
                  dispatch({
                    type: "LOGIN_FAILURE",
                    payload: err.response.data,
                  });
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="flex flex-col gap-1">
                    <label
                      className="font-bold text-slate-900"
                      htmlFor="username"
                    >
                      Username
                    </label>
                    <Field
                      type="username"
                      name="username"
                      className="border-2 border-gray-700 p-2 rounded-md focus:outline-none"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="text-red-600"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label
                      className="font-bold text-slate-900"
                      htmlFor="username"
                    >
                      Password
                    </label>
                    <Field
                      type="password"
                      name="password"
                      className="border-2 border-gray-700 p-2 rounded-md focus:outline-none"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-600"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white font-bold py-2 hover:bg-blue-800 w-full rounded-md mt-4"
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
            <p className="text-center max-w-xl mx-auto text-sm border-y border-slate-200 py-4 tracking-wider font-semibold text-slate-500">
              By signing in or creating an account, you agree with our{" "}
              <span className="text-blue-500">Terms & conditions</span> and{" "}
              <span className="text-blue-500">Privacy statement</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
