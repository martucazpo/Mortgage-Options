import React, {Component} from 'react';
import API from "../../utils/API";
import LinkList from '../linksList';

let imageArr = [];
let dataArr = [];
//let finalArr = [];
//let dataArrs= [];
//let ListPrice = Number;
//let TaxAnnualAmount = Number;
//let MediaURL = "";


class PropertySearch extends Component{

    state = {
        result :{},
        search :"",
        listPrice : Number,
        TaxAnnualAmount : Number,
        img : "",
        listings: []
    };

    componentDidMount(){
      this.searchProperties()
    }

    searchProperties() {
      API.search()
        .then( res => {
          for(let j=0; j<res.data.bundle.length; j++) {
            imageArr.push(res.data.bundle[j])
          }
          return imageArr
        })
        .then(() => {
          for(let i=0; i<imageArr.length; i++){
            dataArr.push({
              ListPrice: imageArr[i].ListPrice,
              TaxAnnualAmount:imageArr[i].TaxAnnualAmount,img:imageArr[i].Media
            })
          }
          this.setState({ listings: dataArr })
        })
        .then(console.log(imageArr,dataArr))
        .catch(err => console.log(err))
    }

    renderListings = () => {
      const listHtml = this.state.listings.map( list => (
        <div>
          <strong>List Price  {list.ListPrice}</strong>
          <p>Annual Tax Amount  {list.TaxAnnualAmount}</p>
          {list.img.map(image => <img src={image.MediaURL} style={{height:"100px",width:"100px"}}/>)}
        </div>
      ))
      return listHtml
    }

   /* handleForm() {
      // event.preventDefault();
         API.saveProperty({
           listPrice: this.state.listPrice,
           TaxAnnualAmount: this.state.TaxAnnualAmount,
           img:this.state.img
         })
           .then(console.log("profile saved!"))
           .catch(err => console.log(err));
     };*/


     render(){  
       
        return(
        <div className="propertySearch">
        <h3>PropertySearch</h3>
        <div className="gallery">
        <div className="images">
          { this.renderListings()}
        </div>
      </div>
        <LinkList/>
        </div>)}

}

export default PropertySearch;