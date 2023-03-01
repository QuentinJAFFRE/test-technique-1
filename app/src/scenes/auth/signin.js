import { Field, Formik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import validator from "validator";

import { setUser } from "../../redux/auth/actions";

import LoadingButton from "../../components/loadingButton";
import api from "../../services/api";

import { validateUserIdFormat } from "../../utils";

export default () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Auth.user);
  let isSignUp = false;

  const [passwordShow, setPasswordShow] = useState(false);
  const showHidePassword = () => {
    if (passwordShow) {
      setPasswordShow(false);
    } else {
      setPasswordShow(true);
    }
  };

  return (
    // Auth Wrapper
    <div className="authWrapper font-myfont">
      <div className="font-[Helvetica] text-center text-[32px] font-semibold	mb-[15px]">Account team</div>

      {user && <Redirect to="/" />}
      <Formik
        initialValues={{ identifier: "", password: "" }}
        onSubmit={async (values, actions) => {
          console.log(values);
          try {
            const { user, token } = await api.post(`/user/signin`, values);
            if (token) api.setToken(token);
            if (user) dispatch(setUser(user));
          } catch (e) {
            console.log("e", e);
            toast.error("Wrong login", e.code);
          }
          actions.setSubmitting(false);
        }}>
        {({ values, errors, isSubmitting, handleChange, handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <div className="mb-[25px]">
                <div className="flex flex-col-reverse">
                  <Field
                    className="peer signInInputs "
                    validate={(v) => isSignUp == false && !validator.isEmail(v) && validateUserIdFormat(v)}
                    name="identifier"
                    id="identifier"
                    value={values.identifier}
                    onChange={handleChange}
                  />
                  <label className="peer-focus:text-[#116eee]" htmlFor="username">
                    Username or Email
                  </label>
                </div>
                {/* Error */}
                <p className="text-[12px] text-[#FD3131]">{errors.identifier}</p>
              </div>
              <div className="mb-[25px]">
                <div className="flex flex-col-reverse">
                  <div className="flex flex-grow">
                    <Field
                      className="peer signInInputs"
                      validate={(v) => isSignUp == false && validator.isEmpty(v) && "This field is Required"}
                      name="password"
                      type={passwordShow ? "text" : "password"}
                      id="password"
                      value={values.password}
                      onChange={handleChange}
                    />
                    <button onClick={showHidePassword} className="text-[#0560FD] pl-2 px-[5px] bg-[#FFFFFF] rounded-[16px]">
                      Show/Hide
                    </button>
                  </div>
                  <label className="peer-focus:text-[#116eee]" htmlFor="password">
                    Password
                  </label>
                </div>
                {/* Error */}
                <p className="text-[12px] text-[#FD3131]">{errors.password}</p>
              </div>
              {/* SignIn Button */}
              <div className="flex gap-3">
                <LoadingButton
                  className="font-[Helvetica] w-[220px] bg-[#007bff] hover:bg-[#0069d9] text-[#fff] rounded-[30px] m-auto block text-[16px] p-[8px] min-h-[42px] "
                  loading={isSubmitting}
                  type="submit"
                  color="primary">
                  Signin
                </LoadingButton>
                <LoadingButton
                  className="font-[Helvetica] w-[220px] bg-[#009dff] hover:bg-[#0069d9] text-[#fff] rounded-[30px] m-auto block text-[16px] p-[8px] min-h-[42px] "
                  onClick={() => {
                    (isSignUp = true) && (window.location.href = "/auth/signup");
                  }}
                  color="primary">
                  Signup
                </LoadingButton>
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};
