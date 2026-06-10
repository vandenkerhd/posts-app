import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as postsApi from "./postsApi";

export const loadPosts = createAsyncThunk("posts/loadPosts", async () => {
  return postsApi.fetchPosts();
});

export const addPost = createAsyncThunk("posts/addPost", async (post) => {
  return postsApi.createPost(post);
});

export const removePost = createAsyncThunk("posts/removePost", async (postId) => {
  await postsApi.deletePost(postId);
  return postId;
});

const initialState = {
  items: [],
  filter: "",
  loading: false,
  initialized: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    filterChanged(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.initialized = true;
        state.items = action.payload;
      })
      .addCase(loadPosts.rejected, (state, action) => {
        state.loading = false;
        state.initialized = true;
        state.error = action.error.message;
      })
      .addCase(addPost.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(removePost.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(removePost.fulfilled, (state, action) => {
        state.error = null;
        state.items = state.items.filter((post) => post.id !== action.payload);
      });
  },
});

export const { filterChanged } = postsSlice.actions;

export default postsSlice.reducer;
