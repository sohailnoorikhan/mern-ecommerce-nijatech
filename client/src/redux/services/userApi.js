// RTK Query
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userInfo?.token;
      const backupToken = JSON.parse(localStorage.getItem("userInfo"))?.token;
      const finalToken = token || backupToken;
      if (finalToken) {
        headers.set("authorization", `Bearer ${finalToken}`);
      } else {
        console.error("Token tapılmadı! İstifadəçi daxil olmayıb.");
      }

      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/auth/profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    toggleUserRole: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useDeleteUserMutation,
  useToggleUserRoleMutation,
  useUpdateProfileMutation,
} = userApi;
