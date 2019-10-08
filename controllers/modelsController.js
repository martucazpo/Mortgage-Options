
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
    console.log("req.params.id 123");
    console.log("buffalo",req.params.id)
    db.Profile
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findProfile: function(req, res) {
    console.log("req.params.id 456");
    db.Profile
      .findOne(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findPropertyById: function(req, res) {
    console.log('Find prop by id')
    db.Property
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findPropertyAndPop: function(req, res) {

    console.log(" akdsf;lkasd f;laksd f;lakjd s;lfkaj ;dlskf j;lakj That there is a BEAR!");
    console.log("Complete ID: 5d9c03bee837873b2c2cd69d")
    console.log("Parms Id:", req.params.id);
    console.log("BOOL", ("5d9c03bee837873b2c2cd69d" === req.params.id))
    db.Profile
      .findById(req.params.id)
      .populate("property")
      .then(dbModel =>{
        console.log('MY DB MODEL', dbModel, req.params.id) 
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },
  findUserById: function(req, res) {
    db.User
      .findOne(req.params.email)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
createProfile: function(req, res) {
    console.log('hit create profile')
    console.log(req.body)
    const {email, ...rest} = req.body;
    console.log("vf")
    db.Profile
      .create(rest)
      .then(dbProfile => {
        console.log('Profile id',dbProfile._id)
        db.User.findOneAndUpdate({email:email}, 
        { $push: { profile: dbProfile._id } }, { new:true }).then(abc => {
          console.log('ABC',abc)
        });
        console.log("pushed to pushy place");
      })
      .catch(err => res.status(422).json(err))
  },
  getPopProf: function(req,res){
    console.log("YOOOOOOO DUUUde");
    // console.log("PARAMS",req.params)
    // console.log("BODY", req.body)
     db.User.findOne(req.params.email)
     .populate("profile")
     .then(profile =>console.log("populated!",profile))
     .catch(err => (console.log(err)))
  },
  createProperty: function(req, res) {
    console.log('hit create property')
    console.log(req.body)
    console.log("vf")
    db.Property
      .create(req.body)
      .then(dbProperty => {
        console.log('Property id',dbProperty._id)
        db.Profile.findOneAndUpdate(req.body.id, 
        { $push: { property: dbProperty._id } }, { new:true }).then(abc => {
          console.log('ABC',abc)
        });
        console.log("pushed to pushy place");
      })
      .catch(err => res.status(422).json(err))
  },
  getPropProp: function(req,res){
    console.log("YOOOOOOO DUUUde");
    // console.log("PARAMS",req.params)
    // console.log("BODY", req.body)
     db.Profile.findById(_id)
     .populate("property")
     .then(property =>console.log("populated!",property))
     .catch(err => (console.log(err)))
  },
  createUser: function(req, res) {
    console.log('hit create user')
    console.log(req.body);
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateProfile: function(req, res) {
    console.log(req.params.id, req.body);
    db.Profile
      .findOneAndUpdate({ _id: req.params.id }, req.body)
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