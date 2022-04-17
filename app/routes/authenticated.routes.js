const express = require("express");
const db = require("../models");
const User = db.user;
const authenticatedRoute = express.Router();

authenticatedRoute.get("/profile", async (req, res, next) => {
    let user = req.principal;
    if (user) {
        return res.json(await User.findByPk(user.id));
    } else {
        return res.status(401).send();
    }
  })

authenticatedRoute.put("/profile", async (req, res, next) => {
    let user = req.principal;
    if (!user) {
        return res.status(401).send();
    }
    try {
        let foundUser = await User.findByPk(user.id);
        if(!foundUser) {
            return res.status(404).send();
        }
        foundUser.update({
            gender: req.body.gender ? req.body.gender : null,
            phoneNumber: req.body.phoneNumber ? req.body.phoneNumber : null,
            image: req.body.image ? req.body.image : null,
            professionalTitle: req.body.professionalTitle ? req.body.professionalTitle : null
        });
        return res.json(foundUser);        
    } catch (error) {
        console.error(error)
        return res.status(500).send();
    }
  })
module.exports = authenticatedRoute;
