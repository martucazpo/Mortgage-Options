import axios from "axios";
const apiKey = process.env.REACT_APP_REAL_ESTATE_KEY;
const BASEURL = "https://api.bridgedataoutput.com/api/v2/test/listings?access_token=" + apiKey;


export default {
  search: function() {
    return axios.get(BASEURL);
  },
  
  //getProfilesWithTheirProperties: function(){
  // console.log("this is the one that you want, you really want it");
  //  return axios.post("/api/profiles/" + id);
 // },
  // Gets all books
  getProfiles: function() {
    console.log("got");
    return axios.get("/api/profiles");
  },
  getProperties: function() {
    console.log("got");
    return axios.get("/api/properties");
  },
  // Gets the book with the given id
  getProfile: function(id) {
    return axios.get("/api/profiles/" + id);
  },
  getProperty: function(id) {
    return axios.get("/api/properties/" + id);
  },
  // Deletes the book with the given id
  deleteProfile: function(id) {
    return axios.delete("/api/profiles/" + id);
  },
  deleteProperty: function(id) {
    return axios.delete("/api/properties/" + id);
  },
  // Saves a book to the database
  saveProfile: function(data) {
    console.log('hit');
    return axios.post("/api/profiles", data);
  },
  saveProperty: function(propertyData) {
    console.log('hit');
    return axios.post("/api/properties", propertyData);
  }
};
