import React from "react";
import Navbar from "../features/navbar/Navbar";
import Posts from "../features/post/components/Posts";
import Users from "../features/user/Users";
import LayoutPage from "./LayoutPage";

const Home = () => {
  return (
    <LayoutPage>
      <Posts />
    </LayoutPage>
  );
};

export default Home;
