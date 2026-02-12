import { useEffect } from "react";
import { useNavigate } from "react-router";




export default function DetailPage() {
    
    
      const navigate = useNavigate();
      

     useEffect(() => {
        fetch(`https://0dlnbf5uxh.execute-api.us-east-1.amazonaws.com/prod/products/{uuid}`)
        .then((response) => response.json())
        .then((data) => console.log(data)).catch((error) => console.error('Error fetching product details:', error)); }, []);
        
        return ( 
        <><div>
                <h1>Product Details</h1>
                <p>Product information will be displayed here.</p>


            </div><button onClick={() => navigate("/")}>
                    Back to Home
                </button></>
  
  );}