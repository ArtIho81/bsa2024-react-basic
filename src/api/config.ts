const BASE_URL = `https://travel-app-api.up.railway.app/api/v1`;

export enum Routes {
  AUTH = `${BASE_URL}/auth`,
  TRIPS = `${BASE_URL}/trips`,
  BOOKINGS = `${BASE_URL}/bookings`,
}

export enum AuthRoutes {
  USER = "/authenticated-user",
  SIGN_IN = "/sign-in",
  SIGN_UP = "/sign-up",
}
