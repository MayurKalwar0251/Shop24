import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/auth";
import { toast } from "react-hot-toast";
import SearchInput from "./Form/SearchInput";
import { useCart } from "../contexts/cart";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();

  function handleLogout(e) {
    localStorage.removeItem("auth");
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    toast.success("Logged out");
  }

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark p-3 ">
      <div className="container-fluid ">
        <Link className="navbar-brand brand" to="/">
          Ecommerce Website
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {!auth.user ? (
              <Fragment>
                <li className="nav-item li-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item li-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </Fragment>
            ) : (
              <Fragment>
                <SearchInput />
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {auth.user.name}
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/dashboard/${
                          auth.user.role === 1 ? "admin" : "user"
                        }`}
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li className="nav-item li-item" onClick={handleLogout}>
                      <Link className="dropdown-item" to="/login">
                        Logout
                      </Link>
                    </li>
                  </ul>
                </li>
              </Fragment>
            )}
            <li className="nav-item li-item">
              <Link className="nav-link" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item li-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>

            <li className="nav-item li-item">
              <Link className="nav-link" to="/contact">
                Contact Us
              </Link>
            </li>
            <li className="nav-item li-item">
              <Link className="nav-link" to="/cart">
                Cart {cart?.length}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
