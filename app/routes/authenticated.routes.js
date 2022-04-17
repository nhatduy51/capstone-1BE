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

authenticatedRoute.put("/", async (req, res, next) => {
    let user = req.principal;
    if (!user) {
        return res.status(401).send();
    }
    try {
        let foundUser = await User.findByPk(user.id);
        foundUser.update({
            gender: req.body.gender,
            phoneNumber: req.body.phoneNumber,
            image: req.body.image,
            professionalTitle: req.body.professionalTitle
        });
        return res.json(foundUser);        
    } catch (error) {
        console.error(error)
        return res.status(500).send();
    }
  })
module.exports = authenticatedRoute;