import React, { Component } from "react";
import { Link } from "react-router-dom";
//import API from "../../utils/API";
import "./Navbar.css";
//import {withRouter} from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "30%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "400px"
  }
};

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      name: ""
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = "#f00";
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

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
                <button className="helloUser" onClick={this.openModal} style={{backgroundColor:"black",color:"white"}}>
                  Hello {user.name}
                </button>
              </li>
            </ul>
          </div>
        </nav>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          ariaHideApp={false}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <button
            className="btn btn-small waves-effect waves-light hoverable red closeButton"
            onClick={this.closeModal}
          >
            X
          </button>
           <div ref={subtitle => (this.subtitle = subtitle)}/>
          <div className="row">
            <div className="col s12 goodbye">
              <p>We're sad to see you go, {user.name}.</p>
            </div>
          </div>

          <div className="row">
            <div className="col s12 logOutButton">
              <button
                onClick={this.onLogoutClick}
                className="btn waves-effect waves-light hoverable black"
              >
                Logout
              </button>
            </div>
          </div>
        </Modal>
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
