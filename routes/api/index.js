const router = require("express").Router();
const profileRoutes = require("./profiles");
const propertyRoutes = require("./properties");

// Model routes
router.use("/profiles", profileRoutes);
router.use("/properties", propertyRoutes);
module.exports = router;
