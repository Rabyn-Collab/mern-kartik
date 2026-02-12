import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'




export const quoteApi = createApi({
  reducerPath: 'quoteApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://quotes15.p.rapidapi.com' }),
  endpoints: (builder) => ({



    getRandomQuotes: builder.query({
      query: () => ({
        url: '/quotes/random/',
        headers: {
          'x-rapidapi-key': '89e53c72d7msh16aa8c041814a4cp1f3e79jsn333d7bcaf747',
        },
        method: 'GET',
      })

    })



  }),
});



export const { useGetRandomQuotesQuery } = quoteApi;


