const express = require("express");
const authController = require("../controllers/authController");

const authRouter = express.Router();
authRouter
  .route("/signUp")
  .get(authController.getSignUp)
  .post(authController.postSignUp);

authRouter.route("/profile").get((req, res) => {
  res.json(req.user);
});

authRouter
  .route("/signIn")
  .get(authController.getSignIn)
  .post(authController.postSignIn);

module.exports = authRouter;
