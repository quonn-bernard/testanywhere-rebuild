import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getServiceBySlug, getAllServices, getServicesByCategory } from "./servicesAPI";

const initialState = {
  currentService: [],
  allServices: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getAllLabServices = createAsyncThunk(
    "services/getAllServices",
    async (_, thunkAPI) => {
        try{
            return await getAllServices();
        }catch (error){
            const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
        return thunkAPI.rejectWithValue(message);
        }
    }
)

export const getLabServiceBySlug = createAsyncThunk(
  "services/getServiceBySlug",
  async (slug, thunkAPI) => {
    try {
      return await getServiceBySlug(slug);
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

export const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLabServiceBySlug.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLabServiceBySlug.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentService = action.payload;
      })
      .addCase(getLabServiceBySlug.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllLabServices.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllLabServices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allServices = action.payload;
      })
      .addCase(getAllLabServices.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = serviceSlice.actions;
export default serviceSlice.reducer;
