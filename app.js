import "dotenv/config";
import express from "express";
import { authRouter } from "./routes/auth-routes.js";
import "./config/passport.setup.js";
import session from "express-session";
import passport from "passport";
import { profileRouter } from "./routes/profile-routes.js";

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(
  session({
    // store: new pgSession({
    //   pool: pool,
    // }),
    secret: "auth",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1 * 24 * 60 * 60 * 1000 },
  })
);
app.use(passport.session());

const authCheck = (req, res, next) => {
  if (!req.user) {
    next();
  } else {
    res.redirect("/profile");
  }
};

app.get("/", authCheck, (req, res) => {
  res.render("index");
});

app.use("/auth", authRouter);
app.use("/profile", profileRouter);

app.listen(process.env.PORT ?? 3001, () => {
  console.log("server running at http://localhost:3000");
});
