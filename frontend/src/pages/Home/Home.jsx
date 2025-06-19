import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../utils";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";
import ProductCategory from "../../components/ProductCategory/ProductCategory";
import { useSiteSettings } from "../../context/SiteSettings/SiteSettingsContext";

function Home() {
  const settings = useSiteSettings();
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const url = "http://localhost:8080/products";
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };

      const response = await fetch(url, headers);
      const result = await response.json();

      // console.log("Fetched Products:", result);
      if (result.success) {
        setProducts(result.products); // result.products is an array
      } else {
        console.log("No products found or unauthorized");
      }
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <div className="home-banner">
          {settings?.heroImage && (
            <img
              src={`http://localhost:8080${settings.heroImage}`}
              alt="Hero"
              style={{ width: "100%", height: "70vh", objectFit: "cover" }}
            />
          )}
        </div>
        <ProductCategory products={products} />

        <ToastContainer />
      </div>
    </>
  );
}

export default Home;
