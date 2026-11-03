// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import "./index.css";

// import { BrowserRouter } from "react-router-dom";
// import { ThemeProvider } from "./context/ThemeContext";
// import CartProvider from "./context/CartContext";

// ReactDOM.createRoot(
//   document.getElementById("root")
// ).render(
//   <React.StrictMode>
//     <ThemeProvider>
//       <CartProvider>
//         <BrowserRouter>
//           <App />
//         </BrowserRouter>
//       </CartProvider>
//     </ThemeProvider>
//   </React.StrictMode>
// );


import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);