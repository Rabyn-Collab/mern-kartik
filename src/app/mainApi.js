import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

//
//export const base = 'http://192.168.1.137:5000';
export const base = 'https://mern-kartik.onrender.com';
const baseApi = `${base}/api`;

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseApi }),
  endpoints: (builder) => ({}),

});