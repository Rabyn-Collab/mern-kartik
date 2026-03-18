import { mainApi } from "../../app/mainApi.js";


const orderApi = mainApi.injectEndpoints({

  endpoints: (builder) => ({


    getOrder: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
        method: 'GET'
      }),
      providesTags: ['Order']
    }),

    getOrders: builder.query({
      query: (q) => ({
        url: '/orders',
        method: 'GET',
        headers: { Authorization: q }
      }),
      providesTags: ['Order']
    }),

    createOrder: builder.mutation({
      query: (q) => ({
        url: '/orders',
        body: q.data,
        headers: { Authorization: q.token },
        method: 'POST'
      }),
      invalidatesTags: ['Order']
    }),




  })

});


export const { useGetOrderQuery, useGetOrdersQuery, useCreateOrderMutation } = orderApi;