import { configureStore } from "@reduxjs/toolkit";
import { cleanlyApi } from "../features/api/cleanlyApi";
import bookingReducer from "../features/booking/bookingSlice";

export const store = configureStore({
  reducer: {
    booking: bookingReducer,
    [cleanlyApi.reducerPath]: cleanlyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cleanlyApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
