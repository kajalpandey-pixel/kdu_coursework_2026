import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchConfigApi } from "../../services/api";
import type { ConfigState } from "./configTypes";



export const fetchConfig= createAsyncThunk("config/fetchConfig" , async () => {
       const response  : any = await fetchConfigApi() ; 
       return response ; 
}) ;


const initialState : ConfigState = {
        cleaningTypes: [] ,
         frequencies: [] ,
         extras: [],
         timeSlots: [] ,
         loading: false,
         error:null ,
} ;



const configSlice =  createSlice({
    name : "config" ,
    initialState : initialState , 
    reducers : {} ,
    extraReducers : (builder) => {
          
        builder
        .addCase(fetchConfig.pending , (state) => {
             state.loading = true ;
             state.error = null ; 
        })
        .addCase(fetchConfig.fulfilled , (state , action)=>{
             state.loading = false;
        state.cleaningTypes = action.payload.cleaningTypes;
        state.frequencies = action.payload.frequencies;
        state.extras = action.payload.extras;
        state.timeSlots = action.payload.timeSlots;
        })
       .addCase(fetchConfig.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load configuration";
      }); 
    }  ,


})

export default configSlice.reducer ; 