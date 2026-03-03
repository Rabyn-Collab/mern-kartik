import { mainApi } from "../../app/mainApi.js";





const productApi = mainApi.injectEndpoints({

  endpoints: (builder) => ({



    getProducts: builder.query({
      query: () => ({
        url: '/products',
        method: 'GET'
      })
    })





  })

});


export const { useGetProductsQuery } = productApi;