import React from "react";
import Navbar from "../features/navbar/Navbar";
import Posts from "../features/post/components/Posts";

const Home = () => {
  return (
    <div>
      <Navbar>
        <Posts/>
      </Navbar>
    </div>
  );
};

export default Home;
