import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
// import "./styles/main.scss";
// import { ProductProvider } from "./context/ProductContext"; 
import { StrictMode } from "react"; 
import {Provider} from 'react-redux' ;      


ReactDOM.createRoot(document.getElementById("root")!).render(
 <StrictMode> 
    <Provider store={store}>
    <BrowserRouter>
      
        <App />
     
    </BrowserRouter>
    </Provider>
    </StrictMode>
 
);
