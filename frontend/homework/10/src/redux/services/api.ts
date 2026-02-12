import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { UsersResponse } from "../types";   

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com", 
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<UsersResponse, void>({
      query: () => "/users",
    }),  

    getUserById : builder.query<any, number>({
      query: (id) => `/users/${id}`,
    }) ,

    addUser: builder.mutation<any, Partial<any>>({
      query: (newUser) => ({
        url: "/users/add",  
        method: "POST",
        body: newUser, 
      }),
    }),

  }),
});

export const { useGetUsersQuery, useGetUserByIdQuery, useAddUserMutation} = api;  



