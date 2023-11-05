import React from "react";
import NavBar from "../components/NavBar";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/url";

const Register = () => {
  const navigate = useNavigate()
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
                email: "",
                password: "",
              }}
              validate={(values) => {
                const errors = {};
                if (!values.username) {
                  errors.username = "Username is required";
                }
                if (!values.email) {
                  errors.email = "Email is Required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                }
                if (!values.password) {
                  errors.password = "Password is required";
                }
                return errors;
              }}
              onSubmit={ async (values, { setSubmitting, resetForm }) => {
                setSubmitting(false)
                try {
                  const response = await axios.post(`${BASE_URL}/api/auth/register`, values);
                  console.log("Registration successful:", response.data);
                  // Handle the successful registration response
                } catch (error) {
                  console.error("Error:", error);
                  // Handle errors, show error messages to the user, etc.
                } finally {
                  resetForm()
                  setSubmitting(false);
                  navigate("/login")
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
                    <ErrorMessage name="username" component="div" className="text-red-600" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label
                      className="font-bold text-slate-900"
                      htmlFor="username"
                    >
                      Email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      className="border-2 border-gray-700 p-2 rounded-md focus:outline-none"
                    />
                    <ErrorMessage name="email" component="div" className="text-red-600" />
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
                    <ErrorMessage name="password" component="div" className="text-red-600" />
                  </div>
                  {/* <div className="flex flex-col gap-1">
                    <label
                      className="font-bold text-slate-900"
                      htmlFor="username"
                    >
                      Conform Password
                    </label>
                    <Field
                      type="password"
                      name="conform_password"
                      className="border-2 border-gray-700 p-2 rounded-md focus:outline-none"
                    />
                    <ErrorMessage name="conform_password" component="div" />
                  </div> */}
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

export default Register;
