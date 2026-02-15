import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import BookYourCleaning from "../components/BookYourCleaning";
import { fetchConfig } from "../app/features/config/configSlice";




export default function Booking() {
     const dispatch = useAppDispatch();
     const { loading, error } = useAppSelector((state) => state.config);

     useEffect(() => {
         dispatch(fetchConfig());
     }, [dispatch]);

     if(loading) {
         return <div>loading configuration ....</div>;
     }
     if(error){
           return <div>error</div>;
     }
    
    return(
       <div>
         
          <BookYourCleaning/>
       </div>

    )

}
