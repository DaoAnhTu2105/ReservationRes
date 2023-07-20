import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navClass = `navbar navbar-expand-lg navbar-dark bg-dark px-4 px-lg-5 py-3 py-lg-0 ${
    isScrolled ? "sticky-top shadow-sm" : ""
  }`;

  return (
    <nav className={navClass}>
      <a href="/" className="navbar-brand p-0">
        <h1 className="text-primary m-0">
          <i className="fa fa-utensils me-3"></i>Restoran
        </h1>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
      >
        <span className="fa fa-bars"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav ms-auto py-0 pe-4">
          <a href="#home_p" className="nav-item nav-link active">
            Home
          </a>
          <a  href="#menu_a" className="nav-item nav-link">
            Menu
          </a>
        </div>
        <a href="#book_a" className="btn btn-primary py-2 px-4">
          Book A Table
        </a>
      </div>
    </nav>
  );
};

export default Header;
