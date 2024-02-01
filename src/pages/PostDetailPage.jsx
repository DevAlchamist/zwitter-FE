import React from "react";
import Navbar from "../features/navbar/Navbar";
import PostDetails from "../features/post/components/PostDetails";
import Users from "../features/user/Users";
import LayoutPage from "./LayoutPage";

const PostDetailPage = () => {
  return (
    <>
      <LayoutPage>
        <PostDetails />
      </LayoutPage>
    </>
  );
};

export default PostDetailPage;
