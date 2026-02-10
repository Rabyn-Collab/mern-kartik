
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://6985b6ac6964f10bf2543623.mockapi.io' }),


  endpoints: (builder) => ({



    getBlogs: builder.query({
      query: (query) => ({
        url: '/blogs',
        params: query,
        method: 'GET',
      }),

    }),


    addBlog: builder.mutation({
      query: (data) => ({
        url: '/blogs',
        body: data,
        method: 'POST',
      })

    })






  })




});
export const { useGetBlogsQuery, useLazyGetBlogsQuery, useAddBlogMutation } = blogApi;