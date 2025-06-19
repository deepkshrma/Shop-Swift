import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../../utils";
import "./Navbar.css";
import { useSiteSettings } from "../../context/SiteSettings/SiteSettingsContext";
// import { useCart } from "../../context/CartContext";

const Navbar = () => {
  // const { cartItems } = useCart();
  const siteSettings = useSiteSettings();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // true if token exists
  }, []);

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
    setRole(localStorage.getItem("role"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    handleSuccess("User Loggedout");
    // use navigate ON LOGIN after 1 sec.
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <nav className="navbar">
      <Link className="navbar-logo" to="/">
      {siteSettings?.siteName || "ShopSwift"}
    </Link>
      <ul className="navbar-links">
        {isLoggedIn && (
          <li>
            <span className="welcome-text">Welcome   </span>
            <span className="user-name"> {loggedInUser}</span>
          </li>
        )}

        <li>
          <Link to="/">Home</Link>
        </li>
        {isLoggedIn && (
          <li>
            <Link to="/cart">🛒 Cart</Link>
          </li>
        )}
        <li>
          <Link to="/Aboutus">About</Link>
        </li>

        {isLoggedIn ? (
          <li>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </li>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
