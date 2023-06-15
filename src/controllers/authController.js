const debug = require("debug")("app:authRouter");
const { MongoClient } = require("mongodb");
const passport = require("passport");
const url =
  "mongodb+srv://Adeayo:genesis1v1@cluster0.66ql7t2.mongodb.net/?retryWrites=true&w=majority";
const dbname = "Globolmantics";

function authController() {
  function getSignUp(req, res) {
    res.render("signup");
  }
  async function postSignUp(req, res) {
    const { username, password } = req.body;
    let client;
    try {
      client = await MongoClient.connect(url);
      const db = client.db(dbname);
      const user = { username, password };
      // eslint-disable-next-line no-unused-vars
      const addedUser = await db.collection("users").insertOne(user);
      const queryAddedUser = await db.collection("users").findOne(user);
      req.login(queryAddedUser, () => {
        res.redirect("/auth/profile");
      });
      debug(queryAddedUser);
    } catch (error) {
      res.send(error);
      debug(error);
    }
    client.close();
  }

  function getSignIn(req, res) {
    res.render("signup");
  }

  function postSignIn() {
    passport.authenticate("local", {
      successRedirect: "/auth/profile",
      failureRedirect: "/",
    });
  }

  return { getSignUp, postSignUp, getSignIn, postSignIn };
}

module.exports = authController();
