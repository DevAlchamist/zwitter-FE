import React from "react";
import Navbar from "../features/navbar/Navbar";
import Users from "../features/user/Users";
import LayoutPage from "./LayoutPage";
import { AllPost } from "../features/post/components/AllPosts";

const Home = () => {
  return (
    <LayoutPage>
      <AllPost />
    </LayoutPage>
  );
};

export default Home;
