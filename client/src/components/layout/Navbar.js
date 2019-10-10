import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import "./Navbar.css";
import {withRouter} from 'react-router-dom';


class Navbar extends Component {

  state = {
    name : ""
  };

 componentDidMount() {
    API.getUser(sessionStorage.getItem('username'))
    .then(res => {
      this.setState({
        name : res.data.name,
      });
  })
  .catch(err => console.log(err))
}

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
                <a href="*">Hello {this.state.name}</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
export default withRouter(Navbar);
