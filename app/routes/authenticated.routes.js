const express = require("express");
const db = require("../models");
const User = db.user;
const authenticatedRoute = express.Router();

authenticatedRoute.get("/", async (req, res, next) => {
    let user = req.principal;
    if (user) {
        return res.json(await User.findByPk(user.id));
    } else {
        return res.status(401).send();
    }
  })

module.exports = authenticatedRoute;