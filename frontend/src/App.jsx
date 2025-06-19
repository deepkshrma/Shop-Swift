import { Navigate, Route, Routes } from "react-router-dom";
import { useState } from "react";
import RefreshHandler from "./RefreshHandler";
import AdminRoute from "./AppRoute";

// admin Route
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Products from "./pages/Admin/Products/Products";
import AddProduct from "./pages/Admin/AddProduct/AddProduct";
import Users from "./pages/Admin/Users/Users";
import AdminSettingsPage from "./pages/Admin/AdminSettingsPage/AdminSettingsPage";

// users Route
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Aboutus from "./pages/Aboutus/Aboutus";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import CartPage from "./context/Cart/Cart";
import PageNotFound from "./pages/404-ERROR/PageNotFound";
import CheckoutSuccess from "./pages/CheckoutSuccess/CheckoutSuccess";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/Aboutus" element={<Aboutus />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/CheckoutSuccess" element={<CheckoutSuccess />} />
        <Route path="*" element={<PageNotFound />} />
        

        {/* Admin Route   */}

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <Products />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/add-product"
          element={
            <AdminRoute>
              <AddProduct />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <Users />
            </AdminRoute>
          }
        />
        <Route path="/admin/settings" element={<AdminSettingsPage />} />
      </Routes>
    </div>
  );
}

export default App;
