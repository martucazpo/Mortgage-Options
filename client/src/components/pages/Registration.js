import React, { Component } from "react";
import Form from "../forms";
import DeleteBtn from "../DeleteBtn";
import API from "../../utils/API";
import { List, ListItem } from "../List";
import LinkList from "../linksList";
import EditBtn from "../EditBtn";
import Calculator from "../Calculator";

class Registration extends Component {
  state = {
    profiles: [],
    // name: "",
    // email: "",
    desiredPayment: "",
    downPayment: ""
  };

  componentDidMount() {
    this.loadProfile();
  }

  loadProfile = () => {
    API.getProfiles()
      .then(res =>
        this.setState({
          profiles: res.data,
          // name: this.state.name,
          // email: this.state.email,
          desiredPayment: this.state.desiredPayment,
          downPayment: this.state.downPayment
        })
      )
      .catch(err => console.log(err));
  };

  deleteProfile = id => {
    API.deleteProfile(id)
      .then(console.log("profile deleted"))
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, prevent the default event and alert the username and password
  handleForm = () => {
    // event.preventDefault();
    API.saveProfile({
      // name: this.state.name,
      // email: this.state.email,
      desiredPayment: this.state.desiredPayment,
      downPayment: this.state.downPayment
    })
      .then(console.log("profile saved!"))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="formDiv">
        <LinkList />
        <Form handleForm={this.handleForm} />
        <List>
          {this.state.profiles.map(profile => (
            <ListItem key={profile._id}>
              <strong>
                {/* <div>{profile.name}</div>
                <div>{profile.email}</div> */}
                <div>{profile.downPayment}</div>
                <div>{profile.desiredPayment}</div>
              </strong>
              <Calculator />
              <EditBtn id={profile._id} />
              <DeleteBtn onClick={() => this.deleteProfile(profile._id)} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

export default Registration;
