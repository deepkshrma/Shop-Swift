import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/ReactToastify.css";
import { SiteSettingsProvider } from "./context/SiteSettings/SiteSettingsContext.jsx";
import { CartProvider } from "./context/Cart/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SiteSettingsProvider>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </SiteSettingsProvider>
  </StrictMode>
);
