import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createComment,
  createPost,
  fetchAllPost,
  fetchCommentByPostId,
  fetchPostById,
  fetchUserAllPosts,
  updatePost,
} from "./postAPI";

const initialState = {
  value: 0,
  status: "idle",
  posts: [],
  postDetails: null,
  postComments: null,
  userPosts: [],
};

export const createPostAsync = createAsyncThunk(
  "post/createPost",
  async (postInfo) => {
    const response = await createPost(postInfo);
    return response.data;
  }
);
export const fetchAllPostAsync = createAsyncThunk(
  "post/fetchPost",
  async () => {
    const response = await fetchAllPost();
    return response.data;
  }
);
export const updatePostAsync = createAsyncThunk(
  "post/updatePost",
  async (updatedPostInfo) => {
    const response = await updatePost(updatedPostInfo);
    return response.data;
  }
);
export const fetchPostByIdAsync = createAsyncThunk(
  "post/fetchPostById",
  async (id) => {
    const response = await fetchPostById(id);
    return response.data;
  }
);
export const fetchCommentByPostIdAsync = createAsyncThunk(
  "post/fetchCommentByPostId",
  async (id) => {
    const response = await fetchCommentByPostId(id);
    return response.data;
  }
);
export const createCommentAsync = createAsyncThunk(
  "post/createComment",
  async (commentInfo) => {
    const response = await createComment(commentInfo);
    return response.data;
  }
);
export const fetchUserAllPostsAsync = createAsyncThunk(
  "post/fetchUserAllPosts",
  async (id) => {
    const response = await fetchUserAllPosts(id);
    return response.data;
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPostAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPostAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.posts.push(action.payload);
      })
      .addCase(fetchAllPostAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllPostAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.posts = action.payload;
      })
      .addCase(updatePostAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatePostAsync.fulfilled, (state, action) => {
        const updatedPost = action.payload;

        const postIndex = state.posts.findIndex(
          (post) => post._id === updatedPost._id
        );

        const userPostIndex = state.userPosts.findIndex(
          (post) => post._id === updatedPost._id
        );

        if (postIndex !== -1) {
          state.posts[postIndex] = updatedPost;
        }
        if (userPostIndex !== -1) {
          state.userPosts[userPostIndex] = updatedPost;
        }
        const { updateDetailPost, profileUserPosts } = action.meta.arg; // Accessing updateDetailPost from action.meta.arg

        if (updateDetailPost && state.postDetails?._id === updatedPost._id) {
          state.postDetails = updatedPost;
        }

        if (profileUserPosts && state.userPosts?._id === updatedPost._id) {
          state.userPosts = updatedPost;
        }
      })
      .addCase(fetchPostByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPostByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.postDetails = action.payload;
      })
      .addCase(fetchCommentByPostIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCommentByPostIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.postComments = action.payload;
      })
      .addCase(createCommentAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCommentAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.postComments.push(action.payload);
        state.postDetails.comments.push(action.payload._id);
      })
      .addCase(fetchUserAllPostsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserAllPostsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userPosts = action.payload;
      });
  },
});

export const selectAllPosts = (state) => state.post.posts;
export const selectPostDetails = (state) => state.post.postDetails;
export const selectPostComments = (state) => state.post.postComments;
export const selectUserPosts = (state) => state.post.userPosts;

export default postSlice.reducer;
