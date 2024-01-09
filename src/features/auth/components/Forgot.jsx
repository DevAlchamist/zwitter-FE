import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

const Forgot = () => {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");
  return (
    <>
      {/* component */}
      <div className=" lg:w-4/12 md:6/12 w-10/12 m-auto my-10 shadow-xl dark:shadow-black/40 border border-gray-400">
        <div className="py-8 px-8 rounded-xl">
          <h1 className="font-medium text-2xl mt-3 text-center">Reset Password</h1>
          <form
            action="submit"
            className="mt-6"
            onSubmit={handleSubmit((data) => setData(JSON.stringify(data),console.log(data)))}
          >
            <div className="my-5 text-sm">
              <label htmlFor="email" className="block text-black">
                Email
              </label>
              <input
                type="email"
                autoFocus=""
                id="email"
                {...register("email", { required: true })}
                className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                placeholder="Alternate Email"
              />
            </div>
            <button
              type="submit"
              className="block text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black w-full"
            >
              Send Mail
            </button>
          </form>
          <p className="mt-12 text-xs text-center font-light text-gray-400">
            {" "}
            Remember?{" "}
            <Link to="/login" className="text-black font-medium">
              {" "}
              Back to{" "}
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Forgot;
