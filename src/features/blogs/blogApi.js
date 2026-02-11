
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://6985b6ac6964f10bf2543623.mockapi.io' }),


  endpoints: (builder) => ({


    getBlog: builder.query({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: 'GET',
      }),
    }),

    getBlogs: builder.query({
      query: (query) => ({
        url: '/blogs',
        params: query,
        method: 'GET',
      }),
      providesTags: ['Blog'],

    }),


    addBlog: builder.mutation({
      query: (data) => ({
        url: '/blogs',
        body: data,
        method: 'POST',
      }),
      invalidatesTags: ['Blog'],

    }),

    removeBlog: builder.mutation({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Blog'],

    }),


    updateBlog: builder.mutation({
      query: (data) => ({
        url: `/blogs/${data.id}`,
        body: data.body,
        method: 'PUT',
      }),
      invalidatesTags: ['Blog'],

    }),








  })




});
export const { useGetBlogQuery, useGetBlogsQuery, useLazyGetBlogsQuery, useAddBlogMutation, useUpdateBlogMutation, useRemoveBlogMutation } = blogApi;