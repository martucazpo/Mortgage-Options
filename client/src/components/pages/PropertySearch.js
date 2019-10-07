import React, { Component } from "react";
import API from "../../utils/API";
import LinkList from "../linksList";
import {withRouter} from 'react-router-dom';
import Navbar from "../layout/Navbar";

let imageArr = [];
let dataArr = [];


class PropertySearch extends Component {
  constructor (props) {
    super(props);
    this.state = {
        result: {},
        search: "",
        ListPrice: 0,
        TaxAnnualAmount: 0,
        img: "",
        listings: [],
        email:"",
        profileId : ""
    }
    this.handleForm = this.handleForm.bind(this);
    this.searchProperties = this.searchProperties.bind(this);
    this.renderListings = this.renderListings.bind(this);
    this.renderImages = this.renderImages.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    //this.result = this.result.bind(this);
    //this.search = this.search.bind(this);
    // this.ListPrice = this.ListPrice.bind(this);
    // this.TaxAnnualAmount = this.TaxAnnualAmount.bind(this);
    // this.img = this.img.bind(this);
    // this.listings = this.listings.bind(this);
    // this.email = this.email.bind(this);
    // this.profileId = this.profileId.bind(this);
  } 


  // state = {
  //   result: {},
  //   search: "",
  //   ListPrice: 0,
  //   TaxAnnualAmount: 0,
  //   img: "",
  //   listings: [],
  //   email:"",
  //   profileId : ""
  // };

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
      
  renderImages = img => {
    if (img <= 0) {
      return;
    }
    const oneImage = [img[0]];
    return oneImage.map(image => (
      <img 
        value={image.MediaURL}
        key={image.MediaUrl}
        src={image.MediaURL}
        alt={""}
        style={{ height: "100px", width: "100px" }}
        onClick={event => this.handleInputChange(event,'value')}
      />
    ));
  };


  handleForm = () => {
    // event.preventDefault();
    console.log(this.state.ListPrice);
    console.log(this.state.TaxAnnualAmount);
    console.log(this.state.img);
    API.saveProperty({
      ListPrice: this.state.ListPrice,
      TaxAnnualAmount: this.state.TaxAnnualAmount,
      img: this.state.img
    })
      .then(console.log("property saved!"))
      .catch(err => console.log(err));
    API.populateProperty(
      this.state.profileId
    )
    .then(console.log("this property is populated!"))
    .catch(err => console.log(err))
  };

  renderListings = () => {
    const listHtml = this.state.listings.map(list => (
      <div onClick={event => this.handleInputChange(event, "value")}>
        <strong>List Price {list.ListPrice}</strong>
        <p>Annual Tax Amount {list.TaxAnnualAmount}</p>
        {this.renderImages(list.img)}
        <button
          onClick={() => this.handleForm({
            ListPrice:this.setState.ListPrice,
            TaxAnnualAmount:this.setState.TaxAnnualAmount,
            img:this.setState.img
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

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    console.log(this.state)
    return (
      <div>
        <Navbar />
        <h3>PropertySearch</h3>
        <div className="row">
          <div className="col s1"></div>
          <div className="col s10 skeleton">
            <div className="propertySearch">
              <div className="gallery">
                <div className="images">{this.renderListings()}</div>
              </div>
            </div>
          </div>
          <div className="col s1"></div>
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
