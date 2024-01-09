import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import logo from "../../../images/zwitter-horizontal.png";

import { createUserAsync, selectLoggedInUser } from "../authSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const user = useSelector(selectLoggedInUser);

  const dispatch = useDispatch();

  return (
    <>
      {/* component */}
      {user && <Navigate to="/"></Navigate>}

      <div className=" lg:w-4/12 md:6/12 w-10/12 m-auto my-10 ">
        <div className="py-8 px-8 rounded-xl shadow-xl dark:shadow-black/40 border border-gray-400">
          <div className=" flex justify-center mx-auto">
            {" "}
            <img src={logo} alt="" className="-mt-7 ml-3" />
          </div>
          <form
            action="submit"
            onSubmit={handleSubmit((data) => {
              console.log(data);
              dispatch(createUserAsync(data));
            })}
            className="mt-6"
          >
            <div className="my-5 text-sm">
              <label htmlFor="name" className="block text-black">
                Name
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                autoFocus=""
                id="name"
                className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                placeholder="name"
              />
            </div>
            <div className="my-5 text-sm">
              <label htmlFor="username" className="block text-black">
                Username
              </label>
              <input
                {...register("username", { required: true })}
                type="text"
                autoFocus=""
                id="username"
                className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                placeholder="Username"
              />
            </div>
            <div className="my-5 text-sm">
              <label htmlFor="password" className="block text-black">
                Password
              </label>
              <input
                {...register("password", { required: true })}
                type="password"
                id="password"
                className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                placeholder="Password"
              />
              <div className="flex justify-end mt-2 text-xs text-gray-600">
                <Link to="/forgot">Forget Password?</Link>
              </div>
            </div>
            <button
              type="submit"
              className="block text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black w-full"
            >
              Signup
            </button>
          </form>
          <p className="mt-12 text-xs text-center font-light text-gray-400">
            {" "}
            Already have an account?{" "}
            <Link to="/login" className="text-black font-medium">
              {" "}
              Login{" "}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
