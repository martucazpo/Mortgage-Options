import React, { Component } from "react";
import API from "../../utils/API";
import LinkList from "../linksList";
import { withRouter } from "react-router-dom";
import Navbar from "../layout/Navbar";
import { Link } from "react-router-dom";
import "./PropertySearch.css";

let imageArr = [];
let dataArr = [];

class PropertySearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: {},
      search: "",
      ListPrice: 0,
      TaxAnnualAmount: 0,
      img: "",
      listings: [],
      email: "",
      profileId: "",
      savedProp: [],
      _id: ""
    };
    this.renderSavedProps = this.renderSavedProps.bind(this);
    this.searchProperties = this.searchProperties.bind(this);
    this.renderListings = this.renderListings.bind(this);
    this.renderImages = this.renderImages.bind(this);
    this.handleLocationReload = this.handleLocationReload.bind(this);
  }

  componentDidMount() {

    API.getUser(sessionStorage.getItem('username'))
    .then(res => {
      console.log(res); 
      this.setState({
        name: res.data.name,
        email: res.data.email,
        profileId: res.data.profile[0]
      });
    });

    this.searchProperties();

    API.getProfile(this.state.profileId)
    .then(res => {
      this.setState({
        downPayment : res.data[0].downPayment,
        desiredPayment : res.data[0].desiredPayment,
        loanTerm : res.data[0].loanTerm,
        propertyId : res.data[0].property,
        profileId : res.data[0]._id })
        })
        .then( data =>
        API.findPropertyAndPop(this.state.profileId))
        .then(res =>
        this.setState({
        savedProp: res.data.property,
              // name: this.state.name,
               // email: this.state.email,
       ListPrice: res.data.property.ListPrice,
      TaxAnnualAmount: res.data.property.TaxAnnualAmount,
      _id: res.data.property._id,
      img: res.data.property.img
            }))
      
    .catch(err => console.log(err));
    
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
      .then(console.log(dataArr, imageArr))
      .catch(err => console.log(err));
  }

  renderImages = img => {
    if (img <= 0) {
      return (
        <img
          value={"../../images/noImage.png"}
          key={"../../images/noImage.png"}
          src={"../../images/noImage.png"}
          alt={"../../images/noImage.png"}
        />
      );
    }
    const oneImage = [img[0]];
    return oneImage.map(image => (
      <img
        value={image.MediaURL}
        key={image.MediaUrl}
        src={image.MediaURL}
        alt={""}
      />
    ));
  };

  handleForm = (ListPrice, TaxAnnualAmount, img) => {
    API.saveProperty({
      ListPrice,
      TaxAnnualAmount,
      img: img.MediaURL,
      id: this.state.profileId
    })
      .then(console.log("property saved!"))

      .catch(err => console.log(err));
    this.handleLocationReload();
  };

  renderListings = () => {
    const listHtml = this.state.listings.map(list => (
      <div>
        {/* <div className="row"> */}
        <div className="col s3">
          <div className="card">
            <div className="card-image">
              {this.renderImages(list.img)}
              <span className="card-title">Card Title</span>
              <a
                className="btn-floating halfway-fab waves-effect waves-light red"
                onClick={() =>
                  this.handleForm(
                    list.ListPrice,
                    list.TaxAnnualAmount,
                    list.img.length > 0 ? list.img[0] : []
                  )
                }
              >
                <i class="material-icons">add</i>
              </a>
            </div>
            <div className="card-content">
              <p>List Price {list.ListPrice}</p>
              <p>Annual Tax Amount {list.TaxAnnualAmount}</p>
            </div>
          </div>
        </div>

        {/* 
          <div className="col s3">
            <div className="card">
              <div className="card-image">
                {this.renderImages(list.img)}
                <span className="card-title">Card Title</span>
                <a
                  className="btn-floating halfway-fab waves-effect waves-light red"
                  onClick={() =>
                    this.handleForm(
                      list.ListPrice,
                      list.TaxAnnualAmount,
                      list.img.length > 0 ? list.img[0] : []
                    )
                  }
                >
                  <i class="material-icons">add</i>
                </a>
              </div>
              <div className="card-content">
                <p>List Price {list.ListPrice}</p>
                <p>Annual Tax Amount {list.TaxAnnualAmount}</p>
              </div>
            </div>
          </div>





          <div className="col s3">
            <div className="card">
              <div className="card-image">
                {this.renderImages(list.img)}
                <span className="card-title">Card Title</span>
                <a
                  className="btn-floating halfway-fab waves-effect waves-light red"
                  onClick={() =>
                    this.handleForm(
                      list.ListPrice,
                      list.TaxAnnualAmount,
                      list.img.length > 0 ? list.img[0] : []
                    )
                  }
                >
                  <i class="material-icons">add</i>
                </a>
              </div>
              <div className="card-content">
                <p>List Price {list.ListPrice}</p>
                <p>Annual Tax Amount {list.TaxAnnualAmount}</p>
              </div>
            </div>
          </div>






          <div className="col s3">
            <div className="card">
              <div className="card-image">
                {this.renderImages(list.img)}
                <span className="card-title">Card Title</span>
                <a
                  className="btn-floating halfway-fab waves-effect waves-light red"
                  onClick={() =>
                    this.handleForm(
                      list.ListPrice,
                      list.TaxAnnualAmount,
                      list.img.length > 0 ? list.img[0] : []
                    )
                  }
                >
                  <i class="material-icons">add</i>
                </a>
              </div>
              <div className="card-content">
                <p>List Price {list.ListPrice}</p>
                <p>Annual Tax Amount {list.TaxAnnualAmount}</p>
              </div>
            </div>
          </div>


           */}
      </div>
      // </div>
    ));
    return listHtml;
  };

  deleteProperty = id => {
    API.deleteProperty(id)
      .then(console.log("profile deleted"))
      .catch(err => console.log(err));
    this.handleLocationReload();
  };

  renderSavedProps = () => {
    const propertyHtml = this.state.savedProp.map(savedProps => (
      <div>
        <strong>List Price {savedProps.ListPrice}</strong>
        <p>Annual Tax Amount {savedProps.TaxAnnualAmount}</p>
        <img
          image={savedProps.img}
          key={savedProps.img}
          src={savedProps.img}
          alt={""}
          style={{ height: "100px", width: "100px" }}
        />
        <button
          onClick={() => this.deleteProperty(savedProps._id)}
          className="btn btn-primary"
          style={{ marginTop: "5px" }}
        >
          Delete Property
        </button>
        <div>
          {" "}
          <Link to={"/results"}>
            <button type="button">Let's see some results!</button>
          </Link>
        </div>
      </div>
    ));
    return propertyHtml;
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
    console.log("set state", this.state);
    return (
      <div>
        <Navbar />

        <div className="row propertyPage">
          <div className="col s1"></div>
          <div className="col s10 propertyBox">
            <div className="propertySearch">
              <div className="gallery">
                <div className="row">{this.renderListings()}</div>
                <h3>Saved Properties</h3>
                <div>{this.renderSavedProps()}</div>
                <h3>
                  Hi {this.state.name}, for what you want to pay per month we
                  recomend a property priced at "PRICE GOES HERE"
                </h3>
                <div>
                  {" "}
                  <Link to={"/results"}>
                    <button type="button">
                      Let's see what that means to you {this.state.name}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col s1"></div>
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
