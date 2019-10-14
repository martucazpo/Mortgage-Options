const router = require("express").Router();
const modelsController = require("../../controllers/modelsController");

// Matches with "/api/books"
router.route("/")
  .get(modelsController.findAllProperties)
  .post(modelsController.createProperty);

// Matches with "/api/books/:id"



router
.route("/tester/:id")
.get(modelsController.findPropertyAndPop)


// /api/properties/:dkjfkdjfkjdkfjdkfj
router
  .route("/proper/:id")
  .get(modelsController.findPropertyById)
  .put(modelsController.updateProperty)
  .delete(modelsController.removeProperty);



module.exports = router;
