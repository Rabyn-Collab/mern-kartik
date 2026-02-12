import { configureStore } from "@reduxjs/toolkit";
import { quoteApi } from "../features/quotes/quoteApi.js";


export const store = configureStore({
  reducer: {

    [quoteApi.reducerPath]: quoteApi.reducer


  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      quoteApi.middleware
    ]),
});