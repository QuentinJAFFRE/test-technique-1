import { Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useHistory, useParams } from "react-router-dom";

import Loader from "../../components/loader";
import LoadingButton from "../../components/loadingButton";
import api from "../../services/api";
import validator from "validator";
import {validateUserIdFormat} from "../../utils";

export default () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      const response = await api.get(`/user/${id}`);
      setUser(response.data);
    })();
  }, []);

  if (!user) return <Loader />;

  return (
    <div>
      <div className="appContainer pt-24">
        <Detail user={user} />
      </div>
    </div>
  );
};

const Detail = ({ user }) => {
  const history = useHistory();

  async function deleteData() {
    const confirm = window.confirm("Are you sure ?");
    if (!confirm) return;
    await api.remove(`/user/${user._id}`);
    toast.success("successfully removed!");
    history.push(`/user`);
  }

  return (
    <Formik
      initialValues={user}
      onSubmit={async (values) => {
        try {
          await api.put(`/user/${user._id}`, values);
          toast.success("Updated!");
          window.location.href = "/user";
        } catch (e) {
          console.log(e);
          toast.error("Some Error!");
        }
      }}>
      {({ values, errors, handleChange, handleSubmit, isSubmitting }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between flex-wrap mt-4">
              <div className="w-full md:w-[260px] mt-[10px] md:mt-0 ">
                <div className="text-[14px] text-[#212325] font-medium	">Name</div>
                <Field
                  className="projectsInput text-[14px] font-normal text-[#212325] bg-[#F9FBFD] rounded-[10px]"
                  validate={validateUserIdFormat}
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                />
                {/* Error */}
                <p className="text-[12px] text-[#FD3131] my-1">{errors.name}</p>
              </div>
              <div className="w-full md:w-[260px] mt-[10px] md:mt-0">
                <div className="text-[14px] text-[#212325] font-medium	">Email</div>
                <Field
                  className="projectsInput text-[14px] font-normal text-[#212325] rounded-[10px]"
                  validate={(v) => !validator.isEmail(v) && !validator.isEmpty(v) && "This must be a valid email"}
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />
                {/* Error */}
                <p className="text-[12px] text-[#FD3131] my-1">{errors.email}</p>
              </div>
              <div className="w-full md:w-[165px] mt-[10px] md:mt-0">
                <div className="text-[14px] text-[#212325] font-medium	">Status</div>
                <select className="projectsInput text-[14px] font-normal text-[#212325] rounded-[10px]" type="select" name="status" value={values.status} onChange={handleChange}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex flex-wrap justify-between mt-4	space-x-3">
              <div className="w-full md:w-[260px] ">
                <div className="text-[14px] text-[#212325] font-medium">Job title</div>
                <input
                  className="projectsInput text-[14px] font-normal text-[#212325] rounded-[10px] bg-[#fff]"
                  name="job_title"
                  value={values.job_title}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex flex-wrap justify-between mt-4">
              <div className="w-full md:w-[260px] ">
                <div className="text-[14px] text-[#212325] font-medium	">Days worked</div>
                <input
                  className="projectsInput text-[14px] font-normal text-[#212325] rounded-[10px]"
                  type="number"
                  name="days_worked"
                  value={values.days_worked}
                  onChange={handleChange}
                />{" "}
              </div>
              <div className="w-full md:w-[260px] ">
                <div className="text-[14px] text-[#212325] font-medium	">Cost per day</div>
                <input
                  className="projectsInput text-[14px] font-normal text-[#212325] rounded-[10px]"
                  type="number"
                  name="costPerDay"
                  value={values.costPerDay}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-[260px] ">
                <div className="text-[14px] text-[#212325] font-medium	">Sell per day</div>
                <input
                  className="projectsInput text-[14px] font-normal text-[#212325] rounded-[10px]"
                  type="number"
                  name="sellPerDay"
                  value={values.sellPerDay}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="w-full mt-3">
              <div className="text-[14px] text-[#212325] font-medium	">Description</div>
              <textarea
                className="w-full text-[14px] font-normal text-[#212325] border border-[#ced4da] mt-2 rounded-[10px] text-sm p-2  focus:outline-none focus:ring focus:ring-[#80bdff]"
                rows="12"
                name="description"
                value={values.description}
                onChange={handleChange}></textarea>
            </div>

            <div className="flex  mt-2">
              <LoadingButton className="bg-[#0560FD] text-[16px] font-medium text-[#FFFFFF] py-[12px] px-[22px] rounded-[10px]" loading={isSubmitting} type={"submit"}>
                Update
              </LoadingButton>
              <button className="ml-[10px] bg-[#F43F5E] text-[16px] font-medium text-[#FFFFFF] py-[12px] px-[22px] rounded-[10px]" onClick={deleteData}>
                Delete
              </button>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};
