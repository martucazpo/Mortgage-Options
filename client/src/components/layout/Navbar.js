import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
class Navbar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0 skeleton navStyle">
          <div className="nav-wrapper blue">
            <Link
              to="/"
              style={{
                fontFamily: "monospace"
              }}
              className="col s12 brand-logo center white-text"
            >
              <i className="material-icons">code</i>
              Mortgage Options
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}
export default Navbar;
