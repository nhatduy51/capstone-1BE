const express = require("express");
const db = require("../models");
const User = db.user;
const Role = db.role;
const bcrypt = require("bcrypt");
const doctorRoute = express.Router();

doctorRoute.get("/", async (req, res, next) => {
  let doctors = await User.findAll({
    include: [{
      model: Role,
      attributes: [],
      require: true,
    }],
    where: { '$roles.name$': 'doctor' }
  })

  return res.json(doctors);
})

doctorRoute.post("/", async (req, res, next) => {
  try {
    const existed = await User.findOne({ where: { username: req.body.username } })
    if(existed) {
      return res.status(400).json('User existed');
    }

    const password = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      username: req.body.username,
      password,
      name: req.body.name ? req.body.name : null,
      gender: req.body.phoneNumber,
      phoneNumber: req.body.phoneNumber,
      image: req.body.image,
      professionalTitle: req.body.professionalTitle
    });

    let roles =  await Role.findOne({
        where: {
          name: 'doctor'
        }
      });

    if(roles) {
      await user.setRoles(roles)
    }

    return res.json(user);
  } catch (error) {
    console.error(error)
    return res.status(500).send();
  }
})

doctorRoute.put("/:id", async (req, res, next) => {
  let doctor = await User.findByPk(req.params.id)
  if(!doctor) {
    return res.status(404).send();
  }

  doctor.update({ name: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa" })

  return res.json(doctor)
})

module.exports = doctorRoute;
