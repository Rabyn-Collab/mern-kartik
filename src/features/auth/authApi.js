import { mainApi } from "../../app/mainApi.js";




const authApi = mainApi.injectEndpoints({

  endpoints: (builder) => ({



    loginUser: builder.mutation({
      query: (q) => ({
        url: '/users/login',
        body: q,
        method: 'POST'
      })
    }),

    registerUser: builder.mutation({
      query: (q) => ({
        url: '/users/register',
        body: q,
        method: 'POST'
      })
    })





  })

});


export const { useLoginUserMutation, useRegisterUserMutation } = authApi;