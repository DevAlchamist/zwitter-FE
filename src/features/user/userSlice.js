import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllUser, fetchUserById, updateUser } from "./userAPI";

const initialState = {
  value: 0,
  status: "idle",
  users: null,
  userDetail: null,
};

export const fetchAllUserAsync = createAsyncThunk(
  "auth/fetchAllUser",
  async (username) => {
    try {
      const response = await fetchAllUser(username);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const fetchUserByIdAsync = createAsyncThunk(
  "profile/fetchUserById",
  async (userId) => {
    try {
      const response = await fetchUserById(userId);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
export const updateUserAsync = createAsyncThunk(
  "profile/updateUser",
  async (updateUserInfo, { rejectWithValue }) => {
    try {
      const response = await updateUser(updateUserInfo);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.users = action.payload;
      })
      .addCase(fetchUserByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userDetail = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userDetail = action.payload;
      });
  },
});

export const selectCount = (state) => state.user.value;

export const selectAllUsers = (state) => state.user.users;
export const selectUserDetails = (state) => state.user.userDetail;

export const selectUserProfileStatus = (state) => state.user.status;


export default userSlice.reducer;
