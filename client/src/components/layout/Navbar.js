import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
class Navbar extends Component {
  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo">
                MORTGAGE OPTIONS
            </Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <a href="*">Hello (username here)</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
export default Navbar;
