import { apiSlice } from "./apiSlice";
const USERS_URL = "api/user";

// We create our own endpoint in this file and injectEndpoints({}) will inject them into apiSlice.js apiSlice.endpoints
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = usersApiSlice;
