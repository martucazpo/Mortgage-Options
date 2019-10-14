import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Landing.css";
import Logo from "../../images/mglogo2.gif";
class Landing extends Component {
  render() {
    return (
      <div className="landingContainer">
        <div className="row">
          <div className="col s1"></div>
          <div className="col s10 z-depth-5 welcomeInfo">
            <img src={Logo} className="mgLogo" alt={""}></img>
            <br></br>
            <p className="welcome">Welcome, You've come to the right place!</p>
            {/* <br></br> */}
            <p className="welcomeBlurb">
              <p>
                We here at Mortgage Genie are dedicated to finding you the right
                home at the right price.
              </p>
              <p>Click one of the buttons down below to get started.</p>
              <p>Happy hunting!</p>
            </p>
          </div>
          <div className="col s1"></div>
        </div>
        <div className="row buttonRow">
          <div className="col s4"></div>
          <div className="col s2">
            <Link
              to="/register"
              className="btn btn-large z-depth-5 waves-effect waves-light hoverable black"
            >
              Register
            </Link>
          </div>
          <div className="col s2">
            <Link
              to="/login"
              style={{
                width: "140px",
                borderRadius: "3px",
                letterSpacing: "1.5px"
              }}
              className="btn btn-large z-depth-5 waves-effect waves-light white black-text"
            >
              Log In
            </Link>
          </div>
          <div className="col s4"></div>
        </div>
        {/* <div className="row welcomeInfo">
          <div className="col s1"></div>
          <div className="col s10 skeleton welcomeBanner">
            <h3>Welcome to Mortgage Options</h3>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div>
          <div className="col s1"></div>
        </div>
        ​
        <div className="row">
          <div className="col s3"></div>
          <div className="col s3 skeleton logInButton">
          </div>
          <div className="col s3 skeleton logInButton">
          </div>
          <div className="col s3"></div>
        </div> */}
      </div>
    );
  }
}
export default Landing;
