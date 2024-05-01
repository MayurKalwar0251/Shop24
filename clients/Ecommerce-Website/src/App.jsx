import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Layout from "./components/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/AboutPage";
import Contact from "./pages/ContactUs";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import { Toaster } from "react-hot-toast";
import DashBoard from "./pages/user/DashBoard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Private from "./components/routes/Private";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AdminRoutes from "./components/routes/AdminRoutes";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct";
import AllUsers from "./pages/admin/AllUsers";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import Products from "./pages/admin/Products";
import UpdateProduct from "./pages/admin/UpdateProduct";
import SearchPage from "./pages/SearchPage";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/product-details/:pid" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />

        <Route path="/dashboard" element={<Private />}>
          <Route path="user" element={<DashBoard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Orders />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoutes />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:pid" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/all-users" element={<AllUsers />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
