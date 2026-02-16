import { createSlice,  type PayloadAction } from "@reduxjs/toolkit";

export interface BookingState {
  cleaningType: string;
  frequency: string;
  bedrooms: number;
  bathrooms: number;
  hours: number;
  date: string;
  timeSlot: string;
  extras: string[];
  name: string;
  email: string;
  phone: string;
  address: string;
  cardNumber: string,
  expiry: string,
  cvv: string,
  termsAccepted: boolean,
  cardName:string,
  zipCode:string,
  specialRequirements: string,
}

type BookingFieldUpdate = {
  [K in keyof BookingState]: {
    field: K;
    value: BookingState[K];
  };
}[keyof BookingState];

const initialState: BookingState = {
  cleaningType: "",
  frequency: "",
  bedrooms: 1,
  bathrooms: 1,
  hours: 2,
  date: "",
  timeSlot: "",
  extras: [],
  name: "",
  email: "",
  phone: "",
  address: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
  termsAccepted: false,
  cardName:"",
  zipCode:"",
  specialRequirements: "",

};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setField: (state, action: PayloadAction<BookingFieldUpdate>) => {
      const { field, value } = action.payload;
      const writableState = state as Record<
        keyof BookingState,
        BookingState[keyof BookingState]
      >;
      writableState[field] = value;
    },
    toggleExtra: (state, action: PayloadAction<string>) => {
      if (state.extras.includes(action.payload)) {
        state.extras = state.extras.filter((e) => e !== action.payload);
      } else {
        state.extras.push(action.payload);
      }
    },
    resetBooking: () => initialState,
  },
});

export const { setField, toggleExtra, resetBooking } =
  bookingSlice.actions;
export default bookingSlice.reducer;
