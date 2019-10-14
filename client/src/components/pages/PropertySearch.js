import React, { Component } from "react";
import API from "../../utils/API";
//import LinkList from "../linksList";
import Navbar from "../layout/Navbar";
import { Link } from "react-router-dom";
import "./PropertySearch.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import NoImage from "../../images/mgNoImage.gif";
import Footer from "../layout/Footer";

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
      id: ""
    };
    this.renderSavedProps = this.renderSavedProps.bind(this);
    this.searchProperties = this.searchProperties.bind(this);
    this.renderListings = this.renderListings.bind(this);
    this.renderImages = this.renderImages.bind(this);
    this.handleLocationReload = this.handleLocationReload.bind(this);
  }

  componentDidMount() {
    let user = this.props.auth;
    console.log(user.user.id);
    API.getUser(user.user.id).then(res => {
      console.log("toast", res);
      this.setState({
        name: res.data.name,
        email: res.data.email,
        profileId: res.data.profile[0]
      });
    });

    this.searchProperties();

    API.popUser(user.user.id).then(res => {
      console.log("bullfrog", res);
      this.setState({
        savedProp: res.data.property,
        ListPrice: res.data.ListPrice,
        TaxAnnualAmount: res.data.property.TaxAnnualAmount,
        id: res.data.property._id,
        img: res.data.property.imageArr
      });
    });
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
      return <img value={NoImage} key={NoImage} src={NoImage} alt={NoImage} />;
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
    let user = this.props.auth;
    API.saveProperty({
      ListPrice,
      TaxAnnualAmount,
      img: img.MediaURL,
      id: user.user.id
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
          <div className="card z-depth-3">
            <div className="card-image">
              {this.renderImages(list.img)}
              <span className="card-title"></span>
              <button
                className="btn-floating halfway-fab z-depth-3 waves-effect waves-light blue"
                onClick={() =>
                  this.handleForm(
                    list.ListPrice,
                    list.TaxAnnualAmount,
                    list.img.length > 0 ? list.img[0] : []
                  )
                }
              >
                <i className="material-icons">add</i>
              </button>
            </div>
            <div className="card-content">
              <div className="ListAndTax">List Price : {list.ListPrice}</div>
              <div className="ListAndTax">
                Annual Tax Amount : {list.TaxAnnualAmount}
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
    return listHtml;
  };

  deleteProperty = id => {
    let user = this.props.auth;
    console.log("delete id", id);
    API.deleteProperty(id)
      .then(console.log("property deleted"))
      .catch(err => console.log(err));

    API.updateUser(user.user.id)
      .then(console.log("property deleted from user"))
      .catch(err => console.log(err));

    this.handleLocationReload();
  };

  renderSavedProps = () => {
    const propertyHtml = this.state.savedProp.map(savedProps => (
      <div key={savedProps.ListPrice}>
        <div className="col s3">
          <div className="card z-depth-3">
            <div className="card-image">
              <img
                image={savedProps.img}
                key={savedProps.img}
                src={savedProps.img}
                alt={""}
                // style={{ height: "100px", width: "100px" }}
              />
              <span className="card-title"></span>
              <button
                onClick={() => this.deleteProperty(savedProps._id)}
                className="btn-floating pulse halfway-fab waves-effect waves-light blue"
              >
                <i className="material-icons">clear</i>
              </button>
            </div>
            <div className="card-content">
              <div className="ListAndTax">
                List Price : {savedProps.ListPrice}
              </div>
              <div className="ListAndTax">
                Annual Tax Amount : {savedProps.TaxAnnualAmount}
              </div>
            </div>
            <div className="card-action">
              <Link to={"/results"}>
                <button
                  className="btn z-depth-3 waves-effect waves-light hoverable black"
                  type="button"
                >
                  Let's see some results!
                </button>
              </Link>
            </div>
          </div>
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
              </div>
            </div>
          </div>
        </div>
        <div className="col s1"></div>
        {/* =============================================================================== */}
        <div className="row propertyPage">
          <div className="col s1"></div>
          <div className="col s10 savedPropBox">
            <h3>Saved Properties</h3>
            <div>{this.renderSavedProps()}</div>
          </div>
          <div className="col s1"></div>
        </div>
        <Footer />
      </div>
    );
  }
}

PropertySearch.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(PropertySearch);
