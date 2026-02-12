import { configureStore } from "@reduxjs/toolkit";
import { translateApi } from "../features/translate/translateApi.js";



export const store = configureStore({
  reducer: {
    [translateApi.reducerPath]: translateApi.reducer

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      translateApi.middleware
    ]),
});