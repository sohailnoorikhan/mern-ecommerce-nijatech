// RTK Query
import { configureStore } from "@reduxjs/toolkit";

// Services
import { userApi } from "./services/userApi";
import { orderApi } from "./services/orderApi";
import { productApi } from "./services/productApi";

// Slices
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice.js";
import wishlistReducer from "./slices/wishlistSlice";

export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productApi.middleware,
      userApi.middleware,
      orderApi.middleware,
    ),
});
