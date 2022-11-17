import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Characters</Link>
        </li>
        <li>
          <Link to="/quotes">Quotes</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
