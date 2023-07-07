import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import CartProvider from "./components/context/cart.jsx";
import AuthProvider from "./components/context/context.jsx";
import SearchProvider from "./components/context/Search.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <SearchProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </SearchProvider>
    </AuthProvider>
  </React.StrictMode>
);
