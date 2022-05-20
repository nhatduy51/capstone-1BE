const express = require("express");
const db = require("../models");
const User = db.user;
const Role = db.role;

const userRouter = express.Router();

userRouter.get("/:id/appointments", async (req, res, next) => {
  let user = await User.findByPk(req.params.id);
  if (!user) {
    return res.status(400).json('User not found');
  }

  let roles = await user.getRoles();

  let rs = [];
  if (roles[0].name === 'user') { //normal user
    rs = await user.getUserAppointments()

  } else if (roles[0].name === 'doctor') { //doctor
    rs = await user.getDoctorAppointments()
  }

  return res.json(rs);
});

userRouter.get("/:id", async (req, res, next) => {
  let user = await User.findByPk(req.params.id, {
    include: [{
      model: Role,
      as: 'roles',
      require: true,
    }]
  })
  if (!user) {
    return res.status(404).send();
  }

  return res.json(user)
})

/* userRouter.get("/", async (req, res, next) => {
  
}); */

module.exports = userRouter;
