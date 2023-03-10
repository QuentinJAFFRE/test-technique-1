import { Field, Formik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import validator from "validator";

import { setUser } from "../../redux/auth/actions";

import LoadingButton from "../../components/loadingButton";
import api from "../../services/api";
import { validatePassword, validateUserIdFormat } from "../../utils";
import { USER_ALREADY_REGISTERED } from "../../constants";

export default () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Auth.user);

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
        initialValues={{ username: "", organisation: "", password: "", email: "" }}
        onSubmit={async (values, actions) => {
          try {
            const { user, token } = await api.post(`/user/signup`, values);
            console.log(user);
            if (token) api.setToken(token);
            if (user) dispatch(setUser(user));
          } catch (e) {
            console.log("e", e);
            if (e.code == USER_ALREADY_REGISTERED) {
              toast.error("This login is already used", e.code);
            } else {
              toast.error("Wrong login", e.code);
            }
          }
          actions.setSubmitting(false);
        }}>
        {({ values, errors, isSubmitting, handleChange, handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <div className="mb-[25px]">
                <div className="flex flex-col-reverse">
                  <Field className="peer signInInputs " validate={validateUserIdFormat} name="username" type="text" id="username" value={values.username} onChange={handleChange} />
                  <label className="peer-focus:text-[#116eee]" htmlFor="username">
                    Username
                  </label>
                </div>
                {/* Error */}
                <p className="text-[12px] text-[#FD3131]">{errors.username}</p>
              </div>
              <div className="mb-[25px]">
                <div className="flex flex-col-reverse">
                  <Field
                    className="peer signInInputs "
                    validate={(v) => !validator.isEmpty(v) && !validator.isEmail(v) && "This must be a valid mail"}
                    name="email"
                    type="text"
                    id="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                  <label className="peer-focus:text-[#116eee]" htmlFor="email">
                    Email
                  </label>
                </div>
                {/* Error */}
                <p className="text-[12px] text-[#FD3131]">{errors.email}</p>
              </div>

              <div className="mb-[25px]">
                <div className="flex flex-col-reverse">
                  <Field
                    className="peer signInInputs "
                    validate={(v) => validator.isEmpty(v) && "This field is Required"}
                    name="organisation"
                    type="text"
                    id="organisation"
                    value={values.organisation}
                    onChange={handleChange}
                  />
                  <label className="peer-focus:text-[#116eee]" htmlFor="organisation">
                    Organisation name
                  </label>
                </div>
                {/* Error */}
                <p className="text-[12px] text-[#FD3131]">{errors.organisation}</p>
              </div>
              <div className="mb-[25px]">
                <div className="flex flex-col-reverse">
                  <div className="flex flex-grow">
                    <Field
                      className="peer signInInputs"
                      validate={validatePassword}
                      name="password"
                      type={passwordShow ? "text" : "password"}
                      id="password"
                      value={values.password}
                      onChange={handleChange}
                    />
                    <button onClick={showHidePassword} className="text-[#0560FD] pl-2 ml-3 px-[5px] bg-[#FFFFFF] rounded-[16px]">
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
              <LoadingButton
                className="font-[Helvetica] w-[220px] bg-[#007bff] hover:bg-[#0069d9] text-[#fff] rounded-[30px] m-auto block text-[16px] p-[8px] min-h-[42px] "
                loading={isSubmitting}
                type="submit"
                color="primary">
                Signup
              </LoadingButton>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};
