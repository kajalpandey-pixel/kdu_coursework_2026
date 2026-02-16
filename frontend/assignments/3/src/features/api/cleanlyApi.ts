import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BookingState } from "../booking/bookingSlice";

export interface CleaningTypeOption {
  id: string;
  name: string;
  basePrice: number;
}

export interface FrequencyOption {
  id: string;
  name: string;
}

export interface ExtraOption {
  id: string;
  name: string;
  price: number;
}

export interface TimeSlotOption {
  id: string;
  label: string;
  available: boolean;
}

export interface BookingConfig {
  cleaningTypes: CleaningTypeOption[];
  frequencies: FrequencyOption[];
  extras: ExtraOption[];
  timeSlots: TimeSlotOption[];
}

export interface ConfigResponse {
  data: BookingConfig;
}

export interface BookingRequest {
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  cleaningDetails: BookingState;
  pricing: {
    finalPrice: number;
  };
}

export interface BookingResponse {
  bookingId: string;
}

export const cleanlyApi = createApi({
  reducerPath: "cleanlyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://l9fwnj12rd.execute-api.ap-south-1.amazonaws.com/prod/config",
  }),
  endpoints: (builder) => ({
    getConfig: builder.query<ConfigResponse, void>({
      query: () => "/config",
    }),
    createBooking: builder.mutation<BookingResponse, BookingRequest>({
      query: (body) => ({
        url: "/booking",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetConfigQuery, useCreateBookingMutation } = cleanlyApi;

