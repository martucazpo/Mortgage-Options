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
// import calculator from "../Mortgage/Calculator";

import "./Registration.css";

//import MortgageCalculator from "mortgage-calculator-react"

class Registration extends Component {
  constructor(props) {
    super(props);
  this.state = {
    profiles: [],
     name: "",
     email: "",
    totalPayment: "",
    termMonths: "",
    downPayment: ""
  };
 this.deleteProfile = this.deleteProfile.bind(this);
 this.handleInputChange = this.handleInputChange.bind(this);
 this.handleLocationReload = this.handleLocationReload.bind(this);
 this.renderProfiles = this.renderProfiles.bind(this);
}

  componentDidMount() {
    let user = this.props.auth;
    console.log("MMMMMMMMMM", user)
    //console.log("My Id!",sessionStorage.getItem('username'))
    API.getUser(user.user.id)
    .then(res => {


      console.log("LKDJF:LSD")
      console.log("ID?",res); 
      this.setState({
        name : res.data.name,
        email : res.data.email,
        id : res.data._id,
        profileId : res.data.profile[0]})
  })
  .catch(err => console.log(err))

  API.popUser(user.user.id)
  .then(res => {
    console.log("innit", res.data.profile[0]._id)
   API.getProfile(res.data.profile[0]._id)
    .then(res => {
      console.log("frogs",res)
      this.setState({
        profiles : [res.data],
        downPayment : res.data.downPayment,
        desiredPayment : res.data.desiredPayment,
        loanTerm : res.data.loanTerm,
        propertyId : res.data.property,
        profileId : res.data._id})
        });
      

      })
  .catch(err => console.log(err))
    
  }
    

  deleteProfile = id => {
    API.deleteProfile(id)
      .then(console.log("profile deleted"))
      .catch(err => console.log(err));
    this.handleLocationReload();
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

  renderProfiles =()=> {
    const myProfile = this.state.profiles.map(profile => (
      <div key={profile._id}>
        <strong>
          <div>{profile.totalPayment}</div>
          <div>{profile.downPayment}</div>
          <div>{profile.termMonths}</div>
        </strong>
        <EditBtn id={profile._id} />
        <DeleteBtn
          onClick={() => this.deleteProfile(profile._id)}
        />
      </div>))
    return myProfile;
  }

  render() {
    return (
      <div className="regPage">
        <Navbar />
        <div className="row regRow">
          <div className="col s2"></div>
          <div className="col s8 regBox">
            <div className="formDiv">
              <h3>
                {this.state.name}, once you have filled it out, this form will
                be hidden from you by Elven Magic!
              </h3>
              <p>
                Ok, maybe not exactly Elven Magic, but you're only getting one
                profile, {this.state.name}
              </p>
              {this.state.profiles.length <= 0 ? (
              <Form/>) : (
              <List>
                <ListItem key={this.state.name}>
                  <div>
                    <h3>
                      This is the part that you will be able to see and to edit,{" "}
                      {this.state.name}
                    </h3>
                    <p>
                      so I guess we will have to make it pretty just for you,{" "}
                      {this.state.name}
                    </p>
                    <p>
                      Also the edit page, which probably needs a link back to
                      here.
                    </p>
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
        </div>
        <h3>This means you {this.state.name}!</h3>
        <div>
          {" "}
          <Link to={"/property"}>
            <button type="button">Let's Find A Property!</button>
          </Link>
        </div>
        <div className="col s2"></div>
        <div className="row">
          <div className="col s12 links">
            <LinkList />
          </div>
        </div>
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
