import { configureStore } from "@reduxjs/toolkit";
import { todoSlice } from "../features/todos/todoSlice.js";




export const store = configureStore({
  reducer: {

    [todoSlice.name]: todoSlice.reducer

  }
});