import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://backend.barberstime.com/api/v1",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().logInUser.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return result;
  },
  tagTypes: ["overview", "host"],
  endpoints: () => ({}),
});


