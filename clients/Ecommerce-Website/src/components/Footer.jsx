import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer text-white bg-dark p-2">
      <h1 className="text-center">All Right Reserved &copy; Techinfoyt</h1>
      <p className="text-center mt-3">
        <Link className="text-white px-2" to="/about">
          About
        </Link>
        |
        <Link className="text-white px-2" to="/contact">
          Contact
        </Link>
        |
        <Link className="text-white px-2" to="/policy">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
};

export default Footer;
