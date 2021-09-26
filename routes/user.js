const express = require('express');
const router = express.Router();

const {getUserById,getUser,getAllUsers,updateUser,usersPurchaseList} = require("../controllers/user");
const {isAdmin, isSignedIn, isAuthenticated} = require("../controllers/auth");


// router.get("/users",getAllUsers);
router.param("userId", getUserById);
router.get("/user/:userId",isSignedIn, isAuthenticated, getUser);
router.put("/user/:userId",isSignedIn, isAuthenticated, updateUser);
router.put("/orders/user/:userId",isSignedIn, isAuthenticated, usersPurchaseList);
module.exports = router;