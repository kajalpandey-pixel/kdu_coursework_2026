import configData from "./mockConfig.json";


export async function fetchConfigApi(){
       
    return  new Promise((resolve) => {
         setTimeout(()=> {
             resolve(configData) ;
         }, 2000) ;
    });
} ;


export const submitBookingApi = async (bookingData: any) => {
     return new Promise((resolve) => {
         setTimeout(()=>{
             console.log("Booking Submitted :" , bookingData) ; 
             resolve({success :true , bookingId: "14BC34"})
         } , 1500) ;
     }) ;
} ;