import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import "react-tagsinput/react-tagsinput.css";
import Loader from "../components/loader";
import LoadingButton from "../components/loadingButton";
import { setUser } from "../redux/auth/actions";
import api from "../services/api";
import { Field, Formik } from "formik";
import { validateUserIdFormat } from "../utils";

export default () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Auth.user);
  console.log(user);
  const [values] = useState({
    ...user,
    email: user.email || "",
    address: user.address || "",
  });

  if (!user) return <Loader />;

  return (
    <div>
      {/* Container */}
      <div className="appContainer">
        <Formik
          initialValues={values}
          onSubmit={async (values) => {
            try {
              await api.put(`/user/${user._id}`, values);
              toast.success("Updated!");
              dispatch(setUser(values));
              window.location.href = "/";
            } catch (e) {
              console.log(e);
              toast.error("Some Error!");
            }
          }}>
          {({ values, errors, isSubmitting, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              {/* First Row */}
              <div className="flex justify-between flex-wrap mt-3">
                <div className="w-full md:w-[48.5%]">
                  <div>Name</div>
                  <Field className="projectsInput" validate={validateUserIdFormat} id="name" name="name" value={values.name} onChange={handleChange} />
                  {/* Error */}
                  <p className="text-[12px] text-[#FD3131] my-1">{errors.name}</p>
                </div>
                <div className="w-full md:w-[48.5%]">
                  <div>Email</div>
                  <Field
                    className="projectsInput"
                    validate={(v) => !validator.isEmail(v) && !validator.isEmpty(v) && "This must be a valid email"}
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                  {/* Error */}
                  <p className="text-[12px] text-[#FD3131] my-1">{errors.email}</p>
                </div>
              </div>
              {/* second Row */}
              <div className="flex justify-between flex-wrap mt-3">
                <div className="w-full md:w-[48.5%]">
                  <div>Address</div>
                  <textarea className="projectsInput h-auto py-2" name="address" value={values.address} onChange={handleChange} />
                </div>
              </div>
              <hr className="my-4" />
              <div className="flex justify-end">
                <LoadingButton
                  className="ml-[10px] bg-[#17a2b8] hover:bg-[#138496] text-[1rem] text-[#fff] py-[0.375rem] px-[0.75rem] rounded-[0.25rem]"
                  loading={isSubmitting}
                  type="submit">
                  Update
                </LoadingButton>
              </div>
            </form>
          )}
        </Formik>
      </div>
      <Toaster />
    </div>
  );
};
