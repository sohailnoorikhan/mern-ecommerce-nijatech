// productApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ 
    baseUrl: "http://localhost:3000/api",
    prepareHeaders: (headers) => {
      // LocalStorage-dən userInfo-nu götürürük
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo?.token) {
        headers.set("authorization", `Bearer ${userInfo.token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Product"], // Cache-i avtomatik yeniləmək üçün
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products",
      providesTags: ["Product"], // Məlumat çəkiləndə işarələyirik
    }),
    // Məhsul silmək üçün yeni mutation
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"], // Silinəndən sonra siyahını avtomatik təzələyir
    }),
    getCategoryCounts: builder.query({
      query: () => "/products/category-counts",
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
    }),
    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Product"], // Siyahını avtomatik yeniləyir
    }),
    updateProduct: builder.mutation({
  query: ({ id, ...rest }) => ({
    url: `/products/${id}`,
    method: "PUT",
    body: rest,
  }),
  invalidatesTags: ["Product"],
}),
  }),
});

export const { 
  useGetProductsQuery, 
  useDeleteProductMutation, // Bunu əlavə etdik
  useGetCategoryCountsQuery, 
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
} = productApi;