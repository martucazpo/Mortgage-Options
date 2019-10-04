const router = require("express").Router();
const profileRoutes = require("./profiles");
const propertyRoutes = require("./properties");
const userRoutes = require("./users");

// Model routes
router.use("/profiles", profileRoutes);
router.use("/properties", propertyRoutes);
router.use("/users",userRoutes)
module.exports = router;
