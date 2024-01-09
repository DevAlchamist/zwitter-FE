import React from "react";
import Navbar from "../features/navbar/Navbar";
import Following from "../features/following/Following";
import PostDetails from "../features/post/components/PostDetails";

const PostDetailPage = () => {
  return (
    <div>
      <Navbar>
        <PostDetails />
        <Following />
      </Navbar>
    </div>
  );
};

export default PostDetailPage;
