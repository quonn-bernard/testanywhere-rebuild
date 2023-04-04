import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import categoryReducer from "../features/categories/categoriesSlice.js"
import ServiceReducer from "../features/services/servicesSlice.js"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    services: ServiceReducer
  },
});
