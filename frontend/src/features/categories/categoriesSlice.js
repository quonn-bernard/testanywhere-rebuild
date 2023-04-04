import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategories, getServicesByCategory } from "./categoriesAPI";

const initialState = {
  services: [],
  categories: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getAllCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, thunkAPI) => {
    console.log('1')
    try {
      return await getCategories();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getServicesByCategoryWSlug = createAsyncThunk(
  "categories/getServicesByCategory",
  async (slug, thunkAPI) => {
    try {
      return await getServicesByCategory(slug);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories = action.payload;
      })
      .addCase(getAllCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getServicesByCategoryWSlug.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getServicesByCategoryWSlug.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.services = action.payload;
      })
      .addCase(getServicesByCategoryWSlug.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = categorySlice.actions;
export default categorySlice.reducer;
