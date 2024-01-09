import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createPost, fetchAllPost, fetchPostById, updatePost } from "./postAPI";

const initialState = {
  value: 0,
  status: "idle",
  posts: [],
  postDetails: null,
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
        if (postIndex !== -1) {
          state.posts[postIndex] = updatedPost;
        }
        const { updateDetailPost } = action.meta.arg; // Accessing updateDetailPost from action.meta.arg
  
        if (updateDetailPost && state.postDetails?._id === updatedPost._id) {
          state.postDetails = updatedPost;
        }
      })
      .addCase(fetchPostByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPostByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.postDetails = action.payload;
      });
  },
});

export const selectAllPosts = (state) => state.post.posts;
export const selectPostDetails = (state) => state.post.postDetails;

export default postSlice.reducer;
