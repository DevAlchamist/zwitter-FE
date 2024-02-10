import React from "react";
import Navbar from "../features/navbar/Navbar";
import Users from "../features/user/Users";

const LayoutPage = ({ children }) => {
  return (
    <div className="flex flex-col w-screen h-screen ">
      <main className="flex font-jakarta-sans h-screen ">
        <div className="hidden min-w-[20%] xl:inline">
          <Navbar />
        </div>
        <div className="flex-grow overflow-y-auto bg-white">
          <div className="">{children}</div>
        </div>
        <div className="hidden min-w-[25%] xl:inline">
          <Users />
        </div>
      </main>
    </div>
  );
};

export default LayoutPage;
