import { Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import Loader from "../../components/loader";
import LoadingButton from "../../components/loadingButton";
import api from "../../services/api";
import { validatePassword, validateUserIdFormat } from "../../utils";
import validator from "validator";
import { USER_ALREADY_REGISTERED } from "../../constants";

const NewList = () => {
  const [users, setUsers] = useState(null);
  const [projects, setProjects] = useState([]);
  const [usersFiltered, setUsersFiltered] = useState(null);
  const [filter, setFilter] = useState({ status: "active", availability: "", search: "" });

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/user");
      setUsers(data);
    })();
    getProjects();
  }, []);

  async function getProjects() {
    const res = await api.get("/project");
    setProjects(res.data);
  }

  useEffect(() => {
    if (!users) return;
    setUsersFiltered(
      users
        .filter((u) => !filter?.status || u.status === filter?.status)
        .filter((u) => !filter?.contract || u.contract === filter?.contract)
        .filter((u) => !filter?.availability || u.availability === filter?.availability)
        .filter((u) => !filter?.search || u.name.toLowerCase().includes(filter?.search.toLowerCase())),
    );
  }, [users, filter]);

  if (!usersFiltered) return <Loader />;

  return (
    <div>
      {/* Container */}
      <div className="pt-6 px-2 md:px-8">
        <div className="flex flex-col-reverse md:flex-row justify-between items-center">
          <div className="flex gap-2 flex-wrap items-center">
            <div className="relative text-[#A0A6B1]">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <button type="submit" className="p-1">
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </button>
              </span>
              <input
                type="search"
                name="q"
                className="py-2 w-[364px] text-[14px] font-normal text-[black] rounded-[10px] bg-[#F9FBFD] border border-[#FFFFFF] pl-10"
                placeholder="Search"
                onChange={(e) => {
                  e.persist();
                  setFilter((prev) => ({ ...prev, search: e.target.value }));
                }}
              />
            </div>
            <SelectAvailability filter={filter} setFilter={setFilter} />
            <FilterStatus filter={filter} setFilter={setFilter} />
            <div>
              <span className="text-sm font-normal text-gray-500">
                <span className="text-base font-medium text-gray-700">{usersFiltered.length}</span> of {users.length}
              </span>
            </div>
          </div>
          <Create />
        </div>
        <div className="overflow-x-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-6 gap-5 ">
            {usersFiltered.map((hit, idx) => {
              return <UserCard key={hit._id} idx={idx} hit={hit} projects={projects} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const Create = () => {
  const [open, setOpen] = useState(false);

  const history = useHistory();

  const [passwordShow, setPasswordShow] = useState(false);
  const showHidePassword = () => {
    if (passwordShow) {
      setPasswordShow(false);
    } else {
      setPasswordShow(true);
    }
  };

  return (
    <div style={{ marginBottom: 10 }}>
      <div className="text-right">
        <button className="bg-[#0560FD] text-[#fff] py-[12px] px-[22px] w-[170px] h-[48px]	rounded-[10px] text-[16px] font-medium" onClick={() => setOpen(true)}>
          Create new user
        </button>
      </div>
      {open ? (
        <div className=" absolute top-0 bottom-0 left-0 right-0  bg-[#00000066] flex justify-center p-[1rem] z-50 " onClick={() => setOpen(false)}>
          <div
            className="w-full md:w-[60%] h-fit  bg-[white] p-[25px] rounded-md"
            onClick={(e) => {
              e.stopPropagation();
            }}>
            <Formik
              initialValues={{ name: "", email: "", password: "" }}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  values.status = "active";
                  values.availability = "not available";
                  values.role = "ADMIN";
                  const res = await api.post("/user", values);
                  if (!res.ok) throw res;
                  toast.success("Created!");
                  setOpen(false);
                  history.push(`/user/${res.data._id}`);
                } catch (e) {
                  console.log(e);
                  if (e.code == USER_ALREADY_REGISTERED) {
                    toast.error("This login is already used", e.code);
                  } else {
                    toast.error("Some error!", e.code);
                  }
                }
                setSubmitting(false);
              }}>
              {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
                <React.Fragment>
                  <div>
                    <div className="flex justify-between flex-wrap">
                      <div className="w-full md:w-[48%] mt-2">
                        <div className="text-[14px] text-[#212325] font-medium	">Name</div>
                        <Field
                          className="projectsInput text-[14px] font-normal text-[#212325] rounded-[10px]"
                          validate={validateUserIdFormat}
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                        />
                        <p className="text-[12px] text-[#FD3131] my-1">{errors.name}</p>
                      </div>
                      <div className="w-full md:w-[48%] mt-2">
                        <div className="text-[14px] text-[#212325] font-medium	">Email</div>
                        <Field
                          className="projectsInput text-[14px] font-normal text-[#212325] rounded-[10px]"
                          validate={(v) => !validator.isEmail(v) && !validator.isEmpty(v) && "This must be a valid email"}
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                        />
                        <p className="text-[12px] text-[#FD3131] my-1">{errors.email}</p>
                      </div>
                    </div>
                    <div className="flex justify-between flex-wrap mt-3">
                      {/* Password */}
                      <div className="w-full md:w-[48%] mt-2">
                        <div className="text-[14px] text-[#212325] font-medium	">Password</div>
                        <div className="flex flex-grow">
                          <Field
                            className="projectsInput text-[14px] font-normal text-[#212325] rounded-[10px]"
                            validate={validatePassword}
                            name="password"
                            type={passwordShow ? "text" : "password"}
                            value={values.password}
                            onChange={handleChange}
                          />
                          <button onClick={showHidePassword} className="text-[#0560FD] mt-2 ml-3 px-[5px] bg-[#FFFFFF] rounded-[16px]">
                            Show/Hide
                          </button>
                        </div>
                        <p className="text-[12px] text-[#FD3131] my-1">{errors.password}</p>
                      </div>
                    </div>
                  </div>

                  <br />
                  <LoadingButton
                    className="mt-[1rem]  bg-[#0560FD] text-[16px] font-medium text-[#FFFFFF] py-[12px] px-[22px] rounded-[10px]"
                    loading={isSubmitting}
                    onClick={handleSubmit}>
                    Save
                  </LoadingButton>
                </React.Fragment>
              )}
            </Formik>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const SelectAvailability = ({ filter, setFilter }) => {
  return (
    <div className="flex">
      <select
        className="w-[180px] bg-[#FFFFFF] text-[14px] text-[#212325] font-normal py-2 px-[14px] rounded-[10px] border-r-[16px] border-[transparent] cursor-pointer"
        value={filter.availability}
        onChange={(e) => setFilter({ ...filter, availability: e.target.value })}>
        <option disabled>Availability</option>
        <option value={""}>All availabilities</option>
        {[
          { value: "available", label: "Available" },

          { value: "not available", label: "Not Available" },
        ].map((e) => {
          return (
            <option key={e.value} value={e.value} label={e.label}>
              {e.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

const FilterStatus = ({ filter, setFilter }) => {
  return (
    <div className="flex">
      <select
        className="w-[180px] bg-[#FFFFFF] text-[14px] text-[#212325] font-normal py-2 px-[14px] rounded-[10px] border-r-[16px] border-[transparent] cursor-pointer"
        value={filter.status}
        onChange={(e) => setFilter({ ...filter, status: e.target.value })}>
        <option disabled>Status</option>
        <option value={""}>All status</option>
        {[
          { value: "active", label: "Active" },
          { value: "inactive", label: "Inactive" },
        ].map((e) => {
          return (
            <option key={e.value} value={e.value} label={e.label}>
              {e.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

const UserCard = ({ hit, projects }) => {
  const history = useHistory();
  return (
    <div
      onClick={() => history.push(`/user/${hit._id}`)}
      className="flex flex-col bg-white hover:-translate-y-1 transition duration-100 shadow-sm ease-in cursor-pointer  relative rounded-[16px] pb-4 overflow-hidden">
      <div className="relative flex items-start justify-center pt-6 pb-2">
        <div className="absolute top-0 left-0 w-full h-full z-10 overflow-hidden">
          <img
            src={hit.banner.startsWith("https://www.gravatar.com/avatar") ? require("../../assets/banner-stud.png") : hit.banner}
            className="object-cover w-full h-full z-10 opacity-60 overflow-hidden"
          />
        </div>
        <div className="flex flex-col items-center z-20">
          <img src={hit.avatar} className="object-contain rounded-full w-20 h-20 " />
          <div className={`rounded-full py-1 px-3 whitespace-nowrap ${hit.availability === "available" ? "bg-[#2EC735]" : "bg-[#8A8989]"} flex items-center gap-2 -translate-y-2`}>
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="4" cy="4" r="4" fill="white" />
            </svg>
            <p className="text-white text-[12px] uppercase tracking-wider">{hit.availability}</p>
          </div>
        </div>
      </div>
      {/* infos */}
      <div className="flex flex-col flex-1 justify-between">
        <div className="flex flex-col items-center text-center my-4 space-y-1">
          <p className="font-semibold text-lg">{hit.name}</p>
        </div>
      </div>
    </div>
  );
};

export default NewList;
