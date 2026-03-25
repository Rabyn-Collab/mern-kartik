import { mainApi } from "../../app/mainApi.js";





const productApi = mainApi.injectEndpoints({

  endpoints: (builder) => ({

    getProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'GET'
      }),
      providesTags: ['Product']
    }),

    getProducts: builder.query({
      query: (query) => ({
        url: '/products',
        method: 'GET',
        params: query
      }),
      // ✅ treat all pages as one cache
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },

      // ✅ append new data instead of replacing
      merge: (currentCache, newData) => {
        currentCache.push(...newData);
      },

      // ✅ refetch when page changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: ['Product']
    }),

    addProduct: builder.mutation({
      query: (q) => ({
        url: '/products',
        body: q.data,
        headers: { Authorization: q.token },
        method: 'POST'
      }),
      invalidatesTags: ['Product']
    }),

    updateProduct: builder.mutation({
      query: (q) => ({
        url: `/products/${q.id}`,
        body: q.data,
        headers: { Authorization: q.token },
        method: 'PATCH'
      }),
      invalidatesTags: ['Product']
    }),

    removeProduct: builder.mutation({
      query: (q) => ({
        url: `/products/${q.id}`,
        headers: { Authorization: q.token },
        method: 'DELETE'
      }),
      invalidatesTags: ['Product']
    }),


  })

});


export const { useGetProductsQuery, useAddProductMutation, useRemoveProductMutation, useUpdateProductMutation, useGetProductQuery } = productApi;