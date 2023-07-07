// import "antd/dist/antd.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Policy from "./pages/Policy";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/routes/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoute from "./components/routes/AdminRoute";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct";
import Users from "./pages/admin/Users";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import Product from "./pages/admin/Product";
import UpdateProduct from "./pages/admin/UpdateProduct";
import SearchValues from "./components/SearchValues";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchValues />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="" element={<AdminRoute />}>
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/admin/product" element={<Product />} />
          <Route
            path="/dashboard/admin/update-product/:slug"
            element={<UpdateProduct />}
          />
          <Route
            path="/dashboard/admin/create-category"
            element={<CreateCategory />}
          />
          <Route
            path="/dashboard/admin/create-product"
            element={<CreateProduct />}
          />
          <Route path="/dashboard/admin/users" element={<Users />} />
        </Route>

        <Route path="" element={<PrivateRoute />}>
          <Route path="/dashboard/user" element={<Dashboard />} />
          <Route path="/dashboard/user/orders" element={<Orders />} />
          <Route path="/dashboard/user/profile" element={<Profile />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/:pId" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
