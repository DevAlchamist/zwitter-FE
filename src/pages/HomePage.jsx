import React from "react";
import Navbar from "../features/navbar/Navbar";
import Posts from "../features/post/components/Posts";
import Following from "../features/following/Following";

const Home = () => {
  return (
    <div>
      <Navbar>
        <Posts/>
        <Following/>
      </Navbar>
    </div>
  );
};

export default Home;
