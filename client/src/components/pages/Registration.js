import React, { Component } from "react";
import Form from "../forms";
import DeleteBtn from "../DeleteBtn";
import API from "../../utils/API";
import { List, ListItem } from "../List";
import LinkList from "../linksList";
import EditBtn from "../EditBtn";
import { withRouter } from "react-router-dom";
import Navbar from "../layout/Navbar";
import { Link } from "react-router-dom";
// import calculator from "../Mortgage/Calculator";

import "./Registration.css";


import MortgageCalculator from "mortgage-calculator-react";


// const reactElement = (
//   <div>
//     <MortgageCalculator />
//   </div>
// );

class Registration extends Component {
  state = {
    profiles: [],
    // name: "",
    // email: "",
    totalPayment: "",
    termMonths: "",
    downPayment: ""
  };

  componentDidMount() {
    API.getUser({ email: this.props.match.params.email })
      .then(res => {
        console.log(res);
        this.setState({
          // name: res.data.name,
          // email: res.data.email
        });
      })


      .catch(err => console.log(err));

  }

  loadProfile = () => {
    API.getProfiles()
      .then(res =>
        this.setState({
          profiles: res.data,
          totalPayment: this.state.totalPayment,
          termMonths: this.state.termMonths,
          downPayment: this.state.downPayment
        })
      )
      .catch(err => console.log(err));
  };

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
              <Form email={this.state.email} />
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
                      {this.state.profiles.map(profile => (
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
                        </div>
                      ))}
                    </div>
                  </div>
                </ListItem>
              </List>
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

export default withRouter(Registration);
