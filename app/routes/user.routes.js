const express = require("express");
const db = require("../models");
const User = db.user;
const Appointment = db.appointment;

const userRouter = express.Router();

userRouter.get("/:id/appointments", async (req, res, next) => {
  const id = req.params.id;
});

/*userRouter.post("/", async (req, res, next) => {

});*/

module.exports = userRouter;
