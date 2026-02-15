import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
// import reducer from "../config/configSlice";
import { submitBookingApi } from "../../services/api";



export interface BookingState { 
     cleaningTypeId : string ;
     frequencyId : string ;
        bedrooms : number ;
        bathrooms : number ;
        hours : number ;
        date : string ;
        timeSlotId : string ;
        extras : string[] ;
        confirmed : boolean ; 
        submitting : boolean ;
        bookingId : string | null ;
        submitError : string | null ;
        termsAccepted : boolean ;
}

export interface BookingDetails extends BookingState {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    pinCode: string;
    //Credit Card Details 
    cardNumber: string;
     cardName: string;
    expiryYear: string;
    expiryMonth: string;
    cvv: string;
 }

const initialState: BookingDetails = {
    cleaningTypeId: "",
  frequencyId: "",
  bedrooms: 1,
  bathrooms: 1,
  hours: 2,
  date: "",
  timeSlotId: "",
  extras: [],
  confirmed: false, 
  submitting: false,
  bookingId: null,
  submitError: null, 
  termsAccepted: false, 
  fullName: "",
    email: "",
    phone: "",
    address: "",
    pinCode: "",
    cardNumber: "",
     cardName: "",
    expiryYear: "",
    expiryMonth: "",
    cvv: "",   
};

export const submitBooking = createAsyncThunk(
  "booking/submitBooking",
  async (_ , { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      const bookingData = state.booking;

      const response: any = await submitBookingApi(bookingData);

      return response; 
      // { success: true, bookingId: "RTubji34" }
    } catch (error: any) {
      return rejectWithValue("Booking failed");
    }
  }
);
const bookingSlice = createSlice({
    name: "booking",
    initialState,

    reducers: {
    setCleaningType(state: { cleaningTypeId: any; }, action: PayloadAction<string>) {
      state.cleaningTypeId = action.payload;
    },
    setFrequency(state, action: PayloadAction<string>) {
      state.frequencyId = action.payload;
    },
    setBedrooms(state, action: PayloadAction<number>) {
      state.bedrooms = action.payload;
    },
    setBathrooms(state, action: PayloadAction<number>) {
      state.bathrooms = action.payload;
    },
    setHours(state, action: PayloadAction<number>) {
      state.hours = action.payload;
    },
    setDate(state, action: PayloadAction<string>) {
      state.date = action.payload;
    },
    setTimeSlot(state, action: PayloadAction<string>) {
      state.timeSlotId = action.payload;
    },
    setPersonalDetails(state, action: PayloadAction<{ field: string; value: string }>) {
      const { field, value } = action.payload;
      (state as any)[field] = value;
    } ,
    setCardField(state, action: PayloadAction<{ field: string; value: string }>) {
      const { field, value } = action.payload;
      (state as any)[field] = value;
    } ,

    setTermsAccepted(state, action: PayloadAction<boolean>) {
      state.termsAccepted = action.payload;
    } ,
    toggleExtra(state, action: PayloadAction<string>) {
      const id = action.payload;
      const exists = state.extras.includes(id);

      state.extras = exists
        ? state.extras.filter((e) => e !== id)
        : [...state.extras, id];
    },
    confirmBooking(state) {
      state.confirmed = true;
    },
    resetBooking() { 
        
      return initialState;
    },
  },
})  ;


export const {
  setCleaningType,
  setFrequency,
  setBedrooms,
  setBathrooms,
  setHours,
  setDate,
  setTimeSlot,
  toggleExtra,
  confirmBooking,
  resetBooking,
  setTermsAccepted ,
  setPersonalDetails,
  setCardField
} = bookingSlice.actions;

export default bookingSlice.reducer;
