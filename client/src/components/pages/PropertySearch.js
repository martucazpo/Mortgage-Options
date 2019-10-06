import React, { Component } from "react";
import API from "../../utils/API";
import LinkList from "../linksList";
import {withRouter} from 'react-router-dom';

let imageArr = [];
let dataArr = [];


class PropertySearch extends Component {
  state = {
    result: {},
    search: "",
    ListPrice: 0,
    TaxAnnualAmount: 0,
    img: "",
    listings: [],
    email:"",
    profileId : ""
  };

  componentDidMount() {
    API.getUser({email:this.props.match.params.email})
    .then(res => {
      console.log(res); 
      this.setState({
        name : res.data.name,
        email : res.data.email,
        profileId : res.data.profile[0]
      })
    })
    .catch(err => console.log(err))
    this.searchProperties();
  }

  searchProperties() {
    API.search()
      .then(res => {
        for (let j = 0; j < res.data.bundle.length; j++) {
          imageArr.push(res.data.bundle[j]);
        }
        return imageArr;
      })
      .then(() => {
        for (let i = 0; i < imageArr.length; i++) {
          dataArr.push({
            ListPrice: imageArr[i].ListPrice,
            TaxAnnualAmount: imageArr[i].TaxAnnualAmount,
            img: imageArr[i].Media
          });
        }
        this.setState({ listings: dataArr
         });
      })
      .then(console.log(dataArr,imageArr))
      .catch(err => console.log(err));
    
  }

  handleForm = (props) => {
    let profileId = this.state.profileId;
    // event.preventDefault()
    API.saveProperty({ 
      ListPrice: this.props.ListPrice,
      TaxAnnualAmount: this.props.TaxAnnualAmount,
      img: this.props.img
    })
      .then(console.log("property saved!"))
      .catch(err => console.log(err));
    API.populateProperty(
      profileId
    )
    .then(console.log("this property is populated!"))
    .catch(err => console.log(err))
  };

  renderListings = () => {
    const listHtml = this.state.listings.map(list => (
      <div key={list.ListPrice}>
        <strong>List Price {list.ListPrice}</strong>
        <p>Annual Tax Amount {list.TaxAnnualAmount}</p>
        {list.img.map(image => (
          <img
            key={image.MediaURL}
            src={image.MediaURL}
            alt={""}
            style={{ height: "100px", width: "100px" }}
          />
        ))}
        <button
          onClick={() => this.handleForm({
            ListPrice:this.ListPrice,
            TaxAnnualAmount:this.TaxAnnualAmount,
            img:this.img
          })}
          className="btn btn-primary"
          style={{ marginTop: "5px" }}
        >
          Save Property
        </button>
      </div>
    ));
    return listHtml;
  };

  render() {
    console.log(this.state)
    return (
      <div>
        <div className="propertySearch">
          <h3>PropertySearch</h3>
          <div className="gallery">
            <div className="images">{this.renderListings()}</div>
          </div>
        </div>
        <div className="row">
          <div className="col s12 links">
            <LinkList />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(PropertySearch);
