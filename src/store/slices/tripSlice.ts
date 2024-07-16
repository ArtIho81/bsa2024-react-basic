import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Status } from "./userSlice";
import { Api, BookingTripRequest } from "../../api/requests";

type Level = "easy" | "moderate" | "difficult";
type TripPreview = { title: string; duration: number; price: number };

export type Trip = TripPreview & {
  id: string;
  description: string;
  level: Level;
  image: string;
  createdAt: string;
};

export type BookingTrip = {
  id: string;
  tripId: string;
  userId: string;
  guests: number;
  totalPrice: number;
  date: string;
  createdAt: string;
  trip: TripPreview;
};

export const getTrips: any = createAsyncThunk<Trip[]>(
  "trips/getTrips",
  async (_, { rejectWithValue }) => {
    try {
      return await Api.getTrips();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getTrip: any = createAsyncThunk<Trip, string>(
  "trips/getTrip",
  async (payload, { rejectWithValue }) => {
    try {
      return await Api.getTrip(payload);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const bookTrip: any = createAsyncThunk<BookingTrip, BookingTripRequest>(
  "trips/bookTrip",
  async (payload, { rejectWithValue }) => {
    try {
      const bookingTrip: BookingTrip = await Api.bookingTrip(payload);
      return bookingTrip;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getBookingTrips: any = createAsyncThunk<BookingTrip[]>(
  "trips/getBookingTrips",
  async (_, { rejectWithValue }) => {
    try {
      return await Api.getBookingTrips();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  trips: [] as Trip[],
  trip: {} as Trip,
  bookingTrips: [] as BookingTrip[],
  status: "",
  error: null,
};

const tripSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {
    addBookingTrip(state, action) {
      state.bookingTrips.push(action.payload.trip);
    },

    cancelBookingTrip(state, action) {
      state.bookingTrips = state.bookingTrips.filter(
        (trip) => trip.id != action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTrips.pending, (state) => {
        state.status = Status.LOADING;
        state.error = null;
      })
      .addCase(getTrips.fulfilled, (state, action) => {
        state.status = Status.RESOLVED;
        state.trips = action.payload;
      })
      .addCase(getTrips.rejected, (state, action) => {
        state.status = Status.REJECTED;
        state.error = action.payload;
      })
      .addCase(bookTrip.pending, (state) => {
        state.status = Status.LOADING;
        state.error = null;
      })
      .addCase(bookTrip.fulfilled, (state, action) => {
        state.status = Status.RESOLVED;
        state.bookingTrips.push(action.payload);
      })
      .addCase(bookTrip.rejected, (state, action) => {
        state.status = Status.REJECTED;
        state.error = action.payload;
      })
      .addCase(getTrip.pending, (state) => {
        state.status = Status.LOADING;
        state.error = null;
      })
      .addCase(getTrip.fulfilled, (state, action) => {
        state.status = Status.RESOLVED;
        state.trip = action.payload;
      })
      .addCase(getTrip.rejected, (state, action) => {
        state.status = Status.REJECTED;
        state.error = action.payload;
      })
      .addCase(getBookingTrips.pending, (state) => {
        state.status = Status.LOADING;
        state.error = null;
      })
      .addCase(getBookingTrips.fulfilled, (state, action) => {
        state.status = Status.RESOLVED;
        state.bookingTrips = action.payload;
      })
      .addCase(getBookingTrips.rejected, (state, action) => {
        state.status = Status.REJECTED;
        state.error = action.payload;
      });
  },
});

export const { addBookingTrip, cancelBookingTrip } = tripSlice.actions;
export default tripSlice.reducer;
