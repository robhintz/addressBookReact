import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <div className="Navbar">
        <Link to="/">
          <h1>Address Book</h1>
        </Link>
        <Link to="/distance">
          <h1>Distance Calculator</h1>
        </Link>
      </div>
    );
  }
}
