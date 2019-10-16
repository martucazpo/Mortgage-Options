const router = require("express").Router();
const modelsController = require("../../controllers/modelsController");

// Matches with "/api/books"
router.route("/")
  .get(modelsController.findAllMortgages)
  .post(modelsController.createMortgage);

// Matches with "/api/books/:id"



router
.route("/tester/:id")
.get(modelsController.findMortgageAndPop)


// /api/properties/:dkjfkdjfkjdkfjdkfj
router
  .route("/mort/:id")
  .get(modelsController.findMortgageById)
  //.put(modelsController.updateMortgage)
  .delete(modelsController.removeMortgage);



module.exports = router;
