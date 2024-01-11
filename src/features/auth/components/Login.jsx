import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import logo from "../../../images/zwitter-horizontal.png";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUserAsync,
  selectError,
  selectLoggedInUser,
  selectUserChecked,
} from "../authSlice";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const user = useSelector(selectLoggedInUser);
  const error = useSelector(selectError);

  const dispatch = useDispatch();
  return (
    <>
      {/* component */}
      {user && <Navigate to="/"></Navigate>}
      <div className=" lg:w-4/12 md:6/12 w-10/12 m-auto my-10 ">
        <div className="py-8 px-8 rounded-xl shadow-xl dark:shadow-black/40 border border-gray-400">
          <div className=" flex justify-center mx-auto">
            {" "}
            <img src={logo} alt="" className="-mt-7 ml-3   " />
          </div>
          <form
            action="submit"
            className="mt-6"
            onSubmit={handleSubmit((data) => {
              console.log(data);
              dispatch(loginUserAsync(data));
            })}
          >
            <div className="my-5 text-sm">
              <label htmlFor="username" className="block text-black">
                Username
              </label>
              <input
                type="text"
                autoFocus=""
                {...register("username", { required: "Username is Required" })}
                id="username"
                className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                placeholder="Username"
              />
              {errors.username && (
                <p className="text-red-500   relative text-center">
                  {errors.username.message}
                </p>
              )}
              {error && (
                <p className="text-red-500 text-center">
                  {error || error.message}
                </p>
              )}
            </div>
            <div className="my-5 text-sm">
              <label htmlFor="password" className="block text-black">
                Password
              </label>
              <input
                {...register("password", { required: "Password is Required" })}
                type="password"
                id="password"
                className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                placeholder="Password"
              />
              {errors.password && (
                <p className="text-red-500   relative text-center">
                  {errors.password.message}
                </p>
              )}
              {error && (
                <p className="text-red-500 text-center">
                  {error || error.message}
                </p>
              )}
              <div className="flex justify-end mt-2 text-xs text-gray-600">
                <Link to="/forgot">Forget Password?</Link>
              </div>
            </div>
            <button
              type="submit"
              className="block text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black w-full"
            >
              Login
            </button>
          </form>
          <p className="mt-12 text-xs text-center font-light text-gray-400">
            {" "}
            Don't have an account?{" "}
            <Link to="/signup" className="text-black font-medium">
              {" "}
              Create One{" "}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
