import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// If you did not use a proxy, you need to enter base URL
const baseQuery = fetchBaseQuery({ baseUrl: "" });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({})
});
