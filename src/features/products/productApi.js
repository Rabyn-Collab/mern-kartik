import { mainApi } from "../../app/mainApi.js";





const productApi = mainApi.injectEndpoints({

  endpoints: (builder) => ({



    getProducts: builder.query({
      query: () => ({
        url: '/products',
        method: 'GET'
      }),
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
    })





  })

});


export const { useGetProductsQuery, useAddProductMutation } = productApi;