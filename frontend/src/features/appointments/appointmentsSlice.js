import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addAppointment, getAvailableAppointmentTimes, getUnavailableAppointmentDates } from "./appointmentsAPI";

const initialState = {
  appointments: [],
  openAppointmentTimes: [],
  closedAppointmentDates: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createNewAppointment = createAsyncThunk(
  "appointments/addAppointment",
  async (apptData, thunkAPI) => {
    try {
      return await addAppointment(apptData);
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

export const setApptDate = createAsyncThunk(
    "appointments/setDate",
    async (dateData, thunkAPI) => {
      try {
        return dateData;
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

  export const getAppointmentTimes = createAsyncThunk(
    "appointments/getAppointmentTimes",
    async (date, thunkAPI) => {
      try {
        return getAvailableAppointmentTimes(date);
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

  export const getUnavailableDates = createAsyncThunk(
    "appointments/getUnavailableDates",
    async (data, thunkAPI) => {
      try {
        return getUnavailableAppointmentDates(data);
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

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewAppointment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewAppointment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.appointments.push(action.payload);
      })
      .addCase(createNewAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message(action.payload);
      })
      .addCase(setApptDate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setApptDate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.date.push(action.payload);
      })
      .addCase(setApptDate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message(action.payload);
      })
      .addCase(getAppointmentTimes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAppointmentTimes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.openAppointmentTimes = action.payload;
      })
      .addCase(getAppointmentTimes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        // state.message(action.payload);
      })
      .addCase(getUnavailableDates.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUnavailableDates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.closedAppointmentDates = action.payload;
      })
      .addCase(getUnavailableDates.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        // state.message(action.payload);
      });
  },
});

export const { reset } = appointmentSlice.actions;
export default appointmentSlice.reducer;
