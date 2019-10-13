import React, { Component } from "react";
import Form from "../forms";
import DeleteBtn from "../DeleteBtn";
import API from "../../utils/API";
import { List, ListItem } from "../List";
import LinkList from "../linksList";
import EditBtn from "../EditBtn";
import Navbar from "../layout/Navbar";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import Footer from "../layout/Footer";
// import calculator from "../Mortgage/Calculator";


import "./Registration.css";


class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: [],
      name: "",
      email: "",
      totalPayment: 0,
      termMonths: 0,
      downPayment: 0
    };
    this.deleteProfile = this.deleteProfile.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLocationReload = this.handleLocationReload.bind(this);
    this.renderProfiles = this.renderProfiles.bind(this);
  }

  componentDidMount() {
    let user = this.props.auth;
    API.getUser(user.user.id)
      .then(res => {
        this.setState({
          name: res.data.name,
          email: res.data.email,
          id: res.data._id,
          profileId: res.data.profile[0]
        });
      })
      .catch(err => console.log(err));

    API.popUser(user.user.id)
      .then(res => {
        API.getProfile(res.data.profile[0]._id).then(res => {
          this.setState({
            profiles: [res.data],
            downPayment: res.data.downPayment,
            desiredPayment: res.data.desiredPayment,
            loanTerm: res.data.loanTerm,
            propertyId: res.data.property,
            profileId: res.data._id
          });
        });
      })
      .catch(err => console.log(err));
  }

  deleteProfile = id => {
    API.deleteProfile(id)
    .then(()=>this.handleLocationReload())
    .catch(err => console.log(err))
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleLocationReload = () => {
    window.location.reload();
  };

  renderProfiles = () => {
    const myProfile = this.state.profiles.map(profile => (
      <div key={profile._id}>
        <strong>
          <div>Total Payment: {profile.totalPayment}</div>
          <div>Downpayment: {profile.downPayment}</div>
          <div>{profile.termMonths}</div>
        </strong>
        <EditBtn id={profile._id} />
        <DeleteBtn onClick={() => this.deleteProfile(profile._id)} />
      </div>
    ));
    return myProfile;
  };

  render() {
    return (
      <div className="regPage">
        <Navbar />
        <div className="row regRow">
          <div className="col s2"></div>
          <div className="col s8 regBox">
            <div className="formDiv">
              {this.state.profiles.length <= 0 ? (
                <Form />
              ) : (
                <List>
                  <ListItem key={this.state.name}>
                    <div>
                      <h3>
                        Here is the information you entered,{""}
                        {this.state.name}.
                      </h3>
                      <p>Please check too see if it is correct,</p>
                      <p>and then let's find a property!</p>
                      <strong>
                        <div>{this.state.name}</div>
                        <div>{this.state.email}</div>
                      </strong>
                      <div>
                        <div>{this.renderProfiles()}</div>
                      </div>
                    </div>
                  </ListItem>
                </List>
              )}
            </div>
          </div>
          <div className="col s2"></div>
        </div>

        <div className="row">
          <div className="col s12 findPropButton">
            <Link to={"/property"}>
              <button
                type="button"
                className="btn btn-large waves-effect waves-light hoverable black"
              >
                Let's Find A Property!
              </button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

Registration.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Registration);
//export default withRouter(Registration);
