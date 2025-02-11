import React from "react";
import "../styles.css";

const Navbar: React.FC = () => {
  return (
    <div className="topnav">
      <a className="active" href="/">Home</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
      <div className="login-container">
        <form>
          <input type="text" placeholder="ID..." />
          <input type="password" placeholder="Password..." />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Navbar;
