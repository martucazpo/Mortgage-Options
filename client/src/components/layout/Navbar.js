import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
class Navbar extends Component {
  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <Link to="/">
              <a href="#" className="brand-logo">
                MORTGAGE OPTIONS
              </a>
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
