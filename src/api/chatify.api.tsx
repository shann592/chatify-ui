import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { LoginFormData, SignUpFormData } from "../lib/types";

export const chatifyApi = createApi({
  reducerPath: "chatifyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["auth"],
  endpoints: (builder) => ({
    checkAuth: builder.query({
      query: () => ({ url: "auth/check" }),
      providesTags: ["auth"],
    }),
    signup: builder.mutation({
      query: (payload: SignUpFormData) => ({
        url: "auth/signup",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["auth"],
    }),
    login: builder.mutation({
      query: (payload: LoginFormData) => ({
        url: "auth/login",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const { useCheckAuthQuery, useSignupMutation, useLoginMutation } =
  chatifyApi;
