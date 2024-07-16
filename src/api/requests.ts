import { BookingTrip, Trip } from "../store/slices/tripSlice";
import { User } from "../store/slices/userSlice";
import { AuthRoutes, Routes } from "./config";

enum HTTPMethods {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
}

export type Auth = {
  email: string;
  password: string;
  fullName?: string;
};
export type AuthResponse = {
  user: User;
  token: string;
};

export type BookingTripRequest = {
  tripId: string;
  guests: number;
  date: string;
};

export class Api {
  public static async authUser(payload: Auth): Promise<AuthResponse> {
    const isSignIn = Object.keys(payload).length === 2;
    const url = `${Routes.AUTH}${
      isSignIn ? AuthRoutes.SIGN_IN : AuthRoutes.SIGN_UP
    }`;
    const response = await fetch(url, {
      method: HTTPMethods.POST,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data: AuthResponse = await response.json();
    return data;
  }

  public static async getUser(): Promise<User> {
    const token = localStorage.getItem("token");
    const url = `${Routes.AUTH}${AuthRoutes.USER}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data: User = await response.json();

    return data;
  }

  public static async getTrips(): Promise<Trip[]> {
    const token = localStorage.getItem("token");
    const response = await fetch(Routes.TRIPS, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data: Trip[] = await response.json();

    return data;
  }

  public static async getTrip(id: string): Promise<Trip> {
    const token = localStorage.getItem("token");
    const response = await fetch(`${Routes.TRIPS}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data: Trip = await response.json();

    return data;
  }

  public static async getBookingTrips(): Promise<BookingTrip[]> {
    const token = localStorage.getItem("token");
    const response = await fetch(`${Routes.BOOKINGS}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();
    return data;
  }

  public static async bookingTrip(
    trip: BookingTripRequest
  ): Promise<BookingTrip> {
    const token = localStorage.getItem("token");
    const response = await fetch(`${Routes.BOOKINGS}`, {
      method: HTTPMethods.POST,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(trip),
    });

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();
    return data;
  }

  public static async deleteBookingTrip(bookingTripId: string) {
    const response = await fetch(`${Routes.BOOKINGS}/${bookingTripId}`, {
      method: HTTPMethods.DELETE,
    });

    if (!response.ok) {
      throw new Error("Something went wrong");
    }
  }
}
