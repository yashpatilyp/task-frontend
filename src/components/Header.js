import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../userContext";

const Header = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  // Navigate to the profile page
  const navigateToProfile = () => {
    navigate('/profile');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <a className="navbar-brand" href="#">
          <img
            src="https://i.pinimg.com/736x/12/06/1f/12061f54ee55f6336c972ad01350b857.jpg"
            width={40}
            alt="Brand Logo"
          />
        </a>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <div className="d-flex justify-content-center w-100 align-items-center">
            {/* Links for Add Product and View Product when user is logged in */}
            {user && (
              <ul className="navbar-nav mx-4">
                <li className="nav-item">
                  <Link to="/add-product" className="nav-link">
                    Add Product
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={`/products`} className="nav-link">
                    View Products
                  </Link>
                </li>
              </ul>
            )}
          </div>
          <div className="d-flex ms-auto align-items-center">
            {/* Conditionally render based on user login state */}
            {user ? (
              <>
                <span
                  className="navbar-text me-3 text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={navigateToProfile}
                >
                  Hello, <strong>{user.name || user.username}</strong>
                </span>
                <button
                  onClick={() => {
                    logout();
                    navigate('/'); // Redirect to the login page after logout
                  }}
                  className="btn btn-danger btn-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/" className="btn btn-primary btn-sm">
                  Login
                </Link>
                <Link to="/register" className="btn btn-success btn-sm mx-2">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
