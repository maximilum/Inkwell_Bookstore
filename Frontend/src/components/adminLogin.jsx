import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, useFormik } from "formik";
import axios from "axios";
import getBaseURL from "../utils/getBaseURL";

const Login = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      adminName: "admin",
      password: "123456",
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`${getBaseURL()}/api/admin`, values);
        if (response.data.token) {
          const token = response.data.token;
          localStorage.setItem("token", token);
          setTimeout(
            () => {
              localStorage.removeItem("token");
              navigate("/admin");
            },
            1000 * 60 * 180, //3 hours
          );
          navigate("/DashboardLayout");
        }
      } catch (error) {
        console.log(error.message);
      }
    },
  });

  return (
    <div className="flex items-center justify-center m-[10px] h-[calc(100dvh-67px)]  ">
      <div className="sm:w-[400px] shadow-2xl p-6">
        <h1 className="mb-10 font-semibold">Admin Login</h1>
        <form onSubmit={formik.handleSubmit} className="text-[16px]">
          <div className="mb-[24px] relative">
            <label
              htmlFor="adminName"
              className="block mb-2 text-[14px] font-semibold"
            >
              Admin
            </label>
            <input
              id="adminName"
              name="adminName"
              value={formik.values.adminName}
              onChange={formik.handleChange}
              type="text"
              placeholder="Admin Name"
              className="w-full py-[12px] px-[16px] border focus:outline-0"
            />
          </div>
          <div className="mb-[24px] relative">
            <label
              htmlFor="password"
              className="block mb-2 text-[14px] font-semibold"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              type="password"
              placeholder="Password"
              className="w-full py-[12px] px-[16px] border focus:outline-0"
            />
          </div>

          <button
            type="submit"
            className="block w-full text-[16px] py-[12px] bg-blue-500 text-white rounded"
          >
            Login
          </button>
        </form>

        <p className="mt-[32px] text-xs text-center text-gray-400">
          ® Admin Panel by maximilum, 2026
        </p>
      </div>
    </div>
  );
};

export default Login;
