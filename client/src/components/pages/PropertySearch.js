import React, { Component } from "react";
import API from "../../utils/API";
import LinkList from "../linksList";
import Navbar from "../layout/Navbar";

let imageArr = [];
let dataArr = [];
//let finalArr = [];
//let dataArrs= [];
//let ListPrice = Number;
//let TaxAnnualAmount = Number;
//let MediaURL = "";

class PropertySearch extends Component {
  state = {
    result: {},
    search: "",
    ListPrice: 0,
    TaxAnnualAmount: 0,
    img: "",
    listings: []
  };

  componentDidMount() {
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
        this.setState({ listings: dataArr });
      })
      .then(console.log(imageArr, dataArr))
      .catch(err => console.log(err));
  }

  renderImages = img => {
    if (img <= 0) {
      return;
    }
    const oneImage = [img[0]];
    return oneImage.map(image => (
      <img
        src={image.MediaURL}
        alt={""}
        style={{ height: "100px", width: "100px" }}
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
  };

  renderListings = () => {
    const listHtml = this.state.listings.map(list => (
      <div>
        <strong>List Price {list.ListPrice}</strong>
        <p>Annual Tax Amount {list.TaxAnnualAmount}</p>
        {this.renderImages(list.img)}
        <button
          onClick={() => this.handleForm()}
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

export default PropertySearch;
