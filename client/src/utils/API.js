import axios from "axios";
let apiKey = process.env.REACT_APP_REAL_ESTATE_KEY;
let BASEURL =
  "https://api.bridgedataoutput.com/api/v2/test_sd/listings?access_token=" +
  apiKey;

export default {
  search: function() {
    return axios.get(BASEURL);
  },
  getProfiles: function() {
    console.log("got");
    return axios.get("/api/profiles");
  },
  getProperties: function() {
    console.log("got");
    return axios.get("/api/properties");
  },
  getUsers: function() {
    console.log("got");
    return axios.get("/api/users");
  },
  // Gets the book with the given id
  getProfile: function(id) {
    return axios.get("/api/profiles/" + id);
  },
  getProperty: function(id) {
    return axios.get("/api/properties/" + id);
  },
  populateProperty: function(profileId) {
    console.log("IIIIIDDDDDD" + profileId)
    return axios.get("/api/profiles/" + profileId);
  },
  getUser: function(email, info) {
    return axios.get("/api/users/" + email, info);
  },
  populateProps: function(){
    console.log("populated");
    return axios.get("/api/users/test");
  },
  updateProfile: function(id, info) {
    return axios.put("/api/profiles/" + id, info);
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
    console.log("hit");
    return axios.post("/api/profiles/", data);
  },
  saveProperty: function(propertyData) {
    console.log("hit");
    return axios.post("/api/properties/", propertyData);
  }
};
