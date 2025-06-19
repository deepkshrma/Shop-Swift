// ProductCategory.jsx
import "./ProductCategory.css";
import Footer from "../Footer/Footer";
import { useSiteSettings } from "../../context/SiteSettings/SiteSettingsContext";
import { useCart } from "../../context/Cart/CartContext";
import { motion } from "framer-motion";

const ProductCategory = ({ products }) => {
  const { addToCart } = useCart();

  const siteSettings = useSiteSettings();
  const gents = products.filter((p) => p.category === "gents");
  const women = products.filter((p) => p.category === "women");
  const child = products.filter((p) => p.category === "child");

  const renderProductCards = (productList) =>
    productList.map((product) => (
      <div key={product._id} className="product-card">
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <p>${product.price}</p>
        <button onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    ));

  return (
    <div>
      <div className="landing-container">
        <h1 className="animated-gradient-text">
          {siteSettings?.heroText || "ShopSwift Clothes Collection"}
        </h1>

        <div className="product-section">
          <h2>Gent's Collection</h2>
          <div className="product-grid">{renderProductCards(gents)}</div>

          <h2>Women's Collection</h2>
          <div className="product-grid">{renderProductCards(women)}</div>

          <h2>Childern's Collection</h2>
          <div className="product-grid">{renderProductCards(child)}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductCategory;
