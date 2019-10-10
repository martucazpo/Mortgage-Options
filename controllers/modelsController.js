
const db = require("../models");


// Defining methods for the booksController
module.exports = {
  findAllProfiles: function(req, res) {
    db.Profile
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findAllProperties: function(req, res) {
    db.Property
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findAllUsers: function(req, res) {
    db.User
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findProfileById: function(req, res) {
    db.Profile
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findProfile: function(req, res) {
    db.Profile
      .findOne(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findPropertyById: function(req, res) {
    db.Property
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findPropertyAndPop: function(req, res) {
    console.log("POPPING")
    console.log("RKP ID", req.params.id)
    console.log("RKBODY ID",req.body.id)
    db.Profile
      .findById(req.params.id)
      .populate("property")
      .then(dbModel =>{
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },
  findUserById: function(req, res) {
    db.User
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
createProfile: function(req, res) {
  console.log("RECK",req.body);
  console.log("RECK ID", req.body.id)
    db.Profile
      .create(req.body)
      .then(dbProfile => {
        console.log("PROFILE",dbProfile)
        db.User.findOneAndUpdate({_id : req.body.id}, 
        { $push: { profile: dbProfile._id } }, { new:true }).then(abc => {
          console.log("ABC",abc);
        });
      })
      .catch(err => res.status(422).json(err))
  },
  // getPopProf: function(req,res){
  //    db.User.findOne(req.params.email)
  //    .populate("profile")
  //    .then(profile =>console.log("populated!",profile))
  //    .catch(err => (console.log(err)))
  // },
  createProperty: function(req, res) {
    db.Property
      .create(req.body)
      .then(dbProperty => {
        console.log("looking for profile", req.body.id)
        db.Profile.findOneAndUpdate({_id:req.body.id}, 
        { $push: { property: dbProperty._id } }, { new:true }).then(abc => {console.log("FFYG",abc)
        });
      })
      .catch(err => res.status(422).json(err))
  },
  getPropProp: function(req,res){
     console.log("Property PARAMS",req.params)
    // console.log("BODY", req.body)
     db.Profile.findById(req.body.id)
     .populate("property")
     .then(property =>console.log("populated!",property))
     .catch(err => (console.log(err)))
  },
  popUser: function(req,res){
    //  console.log("PARAMS",req.params)
      //console.log("BODY", req.body)
     db.User.findById(req.params.id)
     .populate("profile")
     .then(profile =>console.log("profiled!",profile))
     .catch(err => (console.log(err)))
  },
  createUser: function(req, res) {
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateProfile: function(req, res) {
    db.Profile
      .findOneAndUpdate(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateUser: function(req, res) {
    console.log("UPDATE user")
    db.User
      .findOneAndUpdate(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateProperty: function(req, res) {
    db.Property
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  removeProfile: function(req, res) {
    db.Profile
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  removeProperty: function(req, res) {
    db.Property
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  populateProfile: function(req, res){
    db.Profile
    .findOne({_id: req.params.id})
    .populate("property")
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  }
};