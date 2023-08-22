const express = require("express");
const router = express.Router();
const userController = require("../controllers/Usercontroller");
const { authenticateUser, isAdmin } = require("../middleware/authmiddleware"); 

// Register a new user
router.post("/register", userController.signup);

// Login
router.post("/login", userController.login);
router.get("/user", authenticateUser, userController.getAllUsers); 

// Delete
router.delete('/user/:id',isAdmin, userController.deleteUser); 

module.exports = router;
