import { mainApi } from "../../app/mainApi.js";



const userApi = mainApi.injectEndpoints({

  endpoints: (builder) => ({



    getProfile: builder.query({
      query: (q) => ({
        url: '/users/profile',
        headers: { Authorization: q },
        method: 'GET'
      }),
      providesTags: ['Profile']
    }),

    updateUser: builder.mutation({
      query: (q) => ({
        url: '/users/profile',
        body: q.body,
        headers: { Authorization: q.token },
        method: 'PATCH'
      }),
      invalidatesTags: ['Profile']
    })






  })

});


export const { useGetProfileQuery, useUpdateUserMutation } = userApi;