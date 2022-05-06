const express = require("express");
const db = require("../models");
const User = db.user;
const Role = db.role;
const bcrypt = require("bcrypt");
const doctorRoute = express.Router();
const { Op } = require("sequelize");
const authMiddlewares = require('../middlewares/auth.middlewares')

doctorRoute.get("/", authMiddlewares.isAdmin, async (req, res, next) => {
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

doctorRoute.get("/bySpecialist", async (req, res, next) => {
  try {
    let doctors = await User.findAll({
      include: [{
        model: Role,
        attributes: [],
        require: true,
      }],
      where: {
        specialist: req.body.specialist
      }
    })

    return res.json(doctors);
  } catch (e) {
    console.log(e)
  }
})

doctorRoute.get("/byKeyword", async (req, res, next) => {
  try {
    let doctors = await User.findAll({
      include: [{
        model: Role,
        attributes: [],
        require: true,
      }],
      where: {
        [Op.or]: [{
          name: {
            [Op.like]: '%' + req.body.keyword + '%'
          }
        },
          {
            gender: {
              [Op.like]: '%' + req.body.keyword + '%'
            }
          },
          {
            phoneNumber: {
              [Op.like]: '%' + req.body.keyword + '%'
            }
          },
          {
            professionalTitle: {
              [Op.like]: '%' + req.body.keyword + '%'
            }
          },
          {
            specialist: {
              [Op.like]: '%' + req.body.keyword + '%'
            }
          }
        ]
      }
    })

    return res.json(doctors);
  } catch (e) {
    console.log(e)
  }
})


doctorRoute.post("/", authMiddlewares.isAdmin, async (req, res, next) => {
  try {
    const existed = await User.findOne({
      where: {
        username: req.body.username
      }
    })
    if (existed) {
      return res.status(400).json('User existed');
    }

    const password = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      username: req.body.username,
      password,
      name: req.body.name ? req.body.name : null
    });

    let roles = await Role.findOne({
      where: {
        name: 'doctor'
      }
    });

    if (roles) {
      await user.setRoles(roles)
    }

    return res.json(user);
  } catch (error) {
    console.error(error)
    return res.status(500).send();
  }
})

doctorRoute.put("/:id", authMiddlewares.isAdmin, async (req, res, next) => {
  let doctor = await User.findByPk(req.params.id)
  if (!doctor) {
    return res.status(404).send();
  }

  doctor.update({
    name: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  })

  return res.json(doctor)
})


module.exports = doctorRoute;
