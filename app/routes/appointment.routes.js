const express = require("express");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Appointment = db.appointment;
const appointmentRoute = express.Router();

appointmentRoute.get("/", async (req, res, next) => {
  let appointment = await Appointment.findAll()

  return res.json(appointment);
})

async function findUserByPkAndRole(userId, role) {
  return User.findOne({
    include: [{
      model: Role,
      attributes: [],
      require: true,
    }],
    where: {'$roles.name$': role, id: userId}
  });
}

appointmentRoute.get("/", async (req, res, next) => {
  let user = await User.findByPk(13);

  return res.json(await user.getUserAppointments())
})

appointmentRoute.post("/", async (req, res, next) => {
  try {
    const user = await findUserByPkAndRole(req.body.userId, 'user');
    if(!user) {
      return res.status(400).json('User not found')
    }

    const doctor = await findUserByPkAndRole(req.body.doctorId, 'doctor');

    if(!doctor) {
      return res.status(400).json('Doctor not found')
    }

    const appointment = await Appointment.create({ startTime: req.body.startTime, endTime: req.body.endTime, userId: user.id, doctorId: doctor.id });

    return res.json(appointment);
  } catch (error) {
    console.error(error)
    return res.status(500).send();
  }
})

appointmentRoute.put("/:id", async (req, res, next) => {
  let doctor = await User.findByPk(req.params.id)
  if(!doctor) {
    return res.status(404).send();
  }

  doctor.update({ name: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa" })

  return res.json(doctor)
})

module.exports = appointmentRoute;
