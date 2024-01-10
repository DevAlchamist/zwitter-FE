import React from "react";
import Navbar from "../features/navbar/Navbar";

const NotFoundPage = () => {
  return (
    <Navbar>
      <div>
        {/* component */}
        <div className="bg-gray-200 w-fit px-16 md:px-0 h-screen flex items-center justify-center">
          <div className="bg-white border border-gray-200 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl">
            <p className="text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider text-gray-300">
              404
            </p>
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-wider text-gray-500 mt-4">
              Under Construction
            </p>
            <p className="text-gray-500 mt-4 pb-4 w-[80%] border-b-2 text-center">
              Sorry, this feature you are looking for is yet to be added. Visit
              after a while
            </p>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default NotFoundPage;
