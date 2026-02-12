import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



export const translateApi = createApi({
  reducerPath: 'translateApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://free-google-translator.p.rapidapi.com/external-api',
  }),

  endpoints: (builder) => ({


    languageTranslate: builder.mutation({
      query: (query) => ({
        url: '/free-google-translator',
        params: query,
        method: 'POST',
        headers: {
          'x-rapidapi-key': '89e53c72d7msh16aa8c041814a4cp1f3e79jsn333d7bcaf747'
        },
        body: {
          "translate": "rapidapi"
        }

      })
    })


  })
});


export const { useLanguageTranslateMutation } = translateApi;