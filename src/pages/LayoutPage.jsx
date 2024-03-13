import React from "react";
import Navbar from "../features/navbar/Navbar";
import Users from "../features/user/Users";

const LayoutPage = ({ children }) => {
  return (
    <div className="flex flex-col w-screen h-screen ">
      <main className="flex flex-col md:flex-row lg:flex-row xl:flex-row  font-jakarta-sans h-screen ">
        <div className="hidden min-w-[20%] lg:inline xl:inline">
        <Navbar />
        </div>
        <div className="flex-grow overflow-y-auto bg-white">
          <div className="">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default LayoutPage;
