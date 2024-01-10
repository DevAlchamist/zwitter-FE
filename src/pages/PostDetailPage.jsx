import React from "react";
import Navbar from "../features/navbar/Navbar";
import PostDetails from "../features/post/components/PostDetails";

const PostDetailPage = () => {
  return (
    <div>
      <Navbar>
        <PostDetails />
      </Navbar>
    </div>
  );
};

export default PostDetailPage;
