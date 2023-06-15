const express = require("express");
const sessionController = require("../controllers/sessionsController");

const sessionRouter = express.Router();
sessionRouter.use((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/auth/signIn");
  }
});
sessionRouter.route("/").get(sessionController.sessions);

sessionRouter.route("/:id").get(sessionController.session);

module.exports = sessionRouter;
