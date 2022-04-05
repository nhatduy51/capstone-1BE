const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const publicRouter = express.Router();

publicRouter.post(
  "/signup",
  async (req, res, next) => {
    passport.authenticate("signup", { session: false }, async (err, user, info) => {
      if(err) {
        return res.status(400).json(info);
      }

      return res.json({ username: user.username });
    })(req, res, next);
  });

publicRouter.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).send();
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        let roles = await user.getRoles();
        const body = {
          id: user.id,
          username: user.username,
          roles: roles.map(r => {
            return {
              id: r.id,
              name: r.name
            }
          })
        };
        const token = jwt.sign({ user: body }, "TOP_SECRET");

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = publicRouter;
