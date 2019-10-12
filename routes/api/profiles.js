const router = require("express").Router();
const modelsController = require("../../controllers/modelsController");

// Matches with "/api/books"
router.route("/")
  .get(modelsController.findAllProfiles)
  .post(modelsController.createProfile);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(modelsController.findProfileById)
  .post(modelsController.populateProfile)
  .put(modelsController.updateProfile)
  .delete(modelsController.removeProfile);

router
.route("/test")
.get(modelsController.getPropProp);

module.exports = router;
