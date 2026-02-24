import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../authentication/Auth";

const Login = () => {
  // authetication
  const { signUp } = useAuth();
  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => await signUp(data.email, data.password);

  return (
    <div className="flex items-center justify-center m-[10px] h-[calc(100dvh-67px)]  ">
      <div className="sm:w-[400px] shadow-2xl p-6">
        <h1 className="mb-10 font-semibold">Please Register</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="text-[16px]">
          <div className="mb-[24px] relative">
            <label
              htmlFor="email"
              className="block mb-2 text-[14px] font-semibold"
            >
              Email
            </label>
            <input
              {...register("email", {
                required: { value: true, message: "This feld is required" },
              })}
              type="email"
              placeholder="E-mail"
              className="w-full py-[12px] px-[16px] border"
            />
            {errors.email && (
              <span className="text-red-500 text-xs absolute left-2 -bottom-5">
                {errors?.email?.message}
              </span>
            )}
          </div>
          <div className="mb-[24px] relative">
            <label
              htmlFor="password"
              className="block mb-2 text-[14px] font-semibold"
            >
              Password
            </label>
            <input
              {...register("password", {
                required: { value: true, message: "This field is required" },
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              type="password"
              placeholder="Password"
              className="w-full py-[12px] px-[16px] border "
            />
            {errors.password && (
              <span className="text-red-500 text-xs absolute left-2 -bottom-5">
                {errors?.password?.message}
              </span>
            )}
          </div>
          <p className="text-xs my-[16px] ">
            if you have an account,&nbsp;&nbsp;please&nbsp;
            <Link to="/login">
              <span className="text-secondary hover:text-sky-500 font-semibold">
                login
              </span>
            </Link>
          </p>
          <button className="block w-full text-[16px] py-[12px] bg-blue-500 text-white rounded">
            Sign up
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
