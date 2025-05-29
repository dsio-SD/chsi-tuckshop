
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav style={{ display: "flex", gap: "1rem", padding: "1rem", backgroundColor: "#f4f4f4" }}>
    <Link to="/home">Home</Link>
    <Link to="/preorder">Pre Order Snacks</Link>
    <Link to="/topup">Top Up Balance</Link>
    <Link to="/account">My Account</Link>
  </nav>
);

export default Navbar;
