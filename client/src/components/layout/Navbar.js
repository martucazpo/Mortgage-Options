import React, { Component } from "react";
import { Link } from "react-router-dom";
//import API from "../../utils/API";
import "./Navbar.css";
//import {withRouter} from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  state = {
    name: ""
  };

  //  componentDidMount() {
  //     API.getUser(sessionStorage.getItem('username'))
  //     .then(res => {
  //       this.setState({
  //         name : res.data.name,
  //       });
  //   })
  //   .catch(err => console.log(err))
  // }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    return (
      <div>
        <nav>
          <div className="nav-wrapper grey darken-4">
            <Link to="/" className="brand-logo">
              <p className="navLogo">MORTGAGE GENIE</p>
            </Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <a className="helloUser" href="*">
                  Hello {user.name}
                </a>
              </li>
            </ul>
          </div>
          <button
            style={{
              width: "150px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "1rem"
            }}
            onClick={this.onLogoutClick}
            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
          >
            Logout
          </button>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
//export default withRouter(Navbar);
