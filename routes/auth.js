var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const { signout, signup } = require("../controllers/auth");

router.get("/signout", signout);

router.post(
  "/signup",
  [
    check("name", "name should be atleast 3 characters long").isLength({
      min: 3,
    }),

    check("email", "email should be in proper format").isEmail(),

    check("password", "Password Should be atleast 3 characters long").isLength({
      min: 3,
    }),
  ],
  signup
);

module.exports = router;
