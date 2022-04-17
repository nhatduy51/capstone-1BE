const express = require("express");
const db = require("../models");
const User = db.user;
const Appointment = db.appointment;

const userRouter = express.Router();

userRouter.get("/:id/appointments", async (req, res, next) => {
  let user = await User.findByPk(req.params.id);
  if (!user) {
    return res.status(400).json('User not found');
  }

  let roles = await user.getRoles();

  if (roles[0].name === 'user') { //normal user
    return res.json(await user.getUserAppointments());

  } else if (roles[0].name === 'doctor') { //doctor
    return res.json(await user.getDoctorAppointments());
  }

});

/* userRouter.get("/", async (req, res, next) => {
  
}); */

module.exports = userRouter;
