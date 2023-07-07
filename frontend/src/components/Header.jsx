import { NavLink } from "react-router-dom";
import { useAuth } from "../components/context/context";
import { useCart } from "./context/cart";
import SearchInput from "./form/SearchInput";
import { Badge } from "antd";

const Header = () => {
  const { auth, setAuth } = useAuth();
  const { cart, setCart } = useCart();

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
  };

  return (
    <nav className="mr-9">
      <div className="nav-container">
        <h1>logo</h1>
        <div className="link">
          <SearchInput />
          <NavLink to="/">Home</NavLink>
          <NavLink to="/category">Category</NavLink>
          {!auth.token ? (
            <>
              <NavLink to="/signup">SignUp</NavLink>
              <NavLink to="/signin">SignIn</NavLink>
            </>
          ) : (
            <>
              <NavLink
                to={`${
                  auth?.user?.role === true
                    ? "/dashboard/admin"
                    : "/dashboard/user"
                }`}
              >
                Dashboard
              </NavLink>
              <NavLink to="/signin" onClick={handleLogout}>
                Logout
              </NavLink>
            </>
          )}
          <NavLink to="/cart">Cart {cart?.length}</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Header;
