import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3',
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MmMxZTMzZjAxNTc1NWQyN2EyMzE3OTNjNDRlY2ZlZCIsIm5iZiI6MTY3OTk3MjQ4OS4xMDA5OTk4LCJzdWIiOiI2NDIyNTg4OTIzYmU0NjAwZmViZWQ0YzQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ToMLaI_m1nQkW-TbhffuvIrWqrWpU7USu9ZXYab5AyM'
    }

  }),
  endpoints: (builder) => ({


    getMovie: builder.query({
      query: (id) => ({
        url: `/movie/${id}`,
        method: 'GET',
      })
    }),

    getNowPlaying: builder.query({
      query: () => ({
        url: '/movie/now_playing',
        method: 'GET',

      })
    }),
    getPopularMovie: builder.query({
      query: (page) => ({
        url: '/movie/popular',
        params: {
          page
        },
        method: 'GET',
      })
    }),
    getTopRated: builder.query({
      query: () => ({
        url: '/movie/top_rated',
        method: 'GET',
      })
    }),
    getUpComing: builder.query({
      query: () => ({
        url: '/movie/upcoming',
        method: 'GET',
      })
    }),

    getVideoMovie: builder.query({
      query: (id) => ({
        url: `/movie/${id}/videos`,
        method: 'GET',
      })
    }),



  }),
});

export const {
  useGetNowPlayingQuery,
  useGetPopularMovieQuery,
  useGetTopRatedQuery,
  useGetUpComingQuery,
  useGetMovieQuery,
  useGetVideoMovieQuery
} = movieApi;