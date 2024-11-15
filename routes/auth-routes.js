import { Router } from "express";
import passport from "passport";

const authRouter = Router();

authRouter.get("/login", (req, res) => {
  res.render("login");
});

authRouter.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
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
    res.redirect("/profile");
  }
);

export { authRouter };
