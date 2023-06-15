const express = require("express");
const chalk = require("chalk");
const debug = require("debug")("app");
const morgan = require("morgan");
const path = require("path");
const app = express();

const cookieParser = require("cookie-parser");
const expressSession = require("express-session");

const sessionRouter = require("./src/routers/sessionsRouter");
const adminRouter = require("./src/routers/adminRouter");
const authRouter = require("./src/routers/authRouter");

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;

app.use(morgan("tiny"));

// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, "/public/")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(expressSession({ secret: "globolmantics" }));

require("./src/config/passport.js")(app);

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use("/sessions", sessionRouter);
app.use("/admin", adminRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.render("index",);
});
app.get("/index.html", (req, res) => {
  res.render("index");
});
app.listen(PORT, () => {
  debug(`listening to port ${chalk.green(PORT)}`);
});
