import React from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  return (
    <div className="flex items-center justify-center m-[10px] h-[calc(100dvh-67px)]  ">
      <div className="sm:w-[400px] shadow-2xl p-6">
        <h1 className="mb-10 font-semibold">Please Login</h1>
        <form action="" className="text-[16px]">
          <div className="mb-[24px]">
            <label
              htmlFor="email"
              className="block mb-2 text-[14px] font-semibold"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="E-mail"
              className="w-full py-[12px] px-[16px] border focus:outline-0"
            />
          </div>
          <div className="mb-[24px]">
            <label
              htmlFor="password"
              className="block mb-2 text-[14px] font-semibold"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="w-full py-[12px] px-[16px] border focus:outline-0"
            />
          </div>
          <p className="text-xs my-[16px] ">
            if you don't have an account,&nbsp;&nbsp;
            <Link to="/register">
              <span className="text-secondary hover:text-sky-500 font-semibold">
                register
              </span>
            </Link>
          </p>
          <button className="block w-full text-[16px] py-[12px] bg-blue-500 text-white rounded">
            Login
          </button>
        </form>
        <button className=" flex justify-center gap-4  mt-[8px] w-full text-[16px] py-[12px] border text-black">
          <span className=" flex justify-center items-center ">
            <FcGoogle />
          </span>
          <span>sign in with google</span>
        </button>
        <p className="mt-[32px] text-xs text-center text-gray-400">
          ® Bookstore by maximilum, 2023
        </p>
      </div>
    </div>
  );
};

export default Login;
