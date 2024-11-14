import { Router } from "express";
import passport from "passport";

const authRouter = Router();

authRouter.get("/login", (req, res) => {
  res.render("login");
});

authRouter.get("/logout", (req, res) => {
  res.send("Logging out");
});

authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

authRouter.get(
  "/google/redirect",
  passport.authenticate("google"),
  (req, res) => {
    console.log(req.query.code, req.query.scope);
    res.send("Welcome");
  }
);

export { authRouter };
