const express = require("express");
const db = require("../models");
const User = db.user;
const Appointment = db.appointment;

const userRouter = express.Router();

userRouter.get("/", async (req, res, next) => {

});

userRouter.post("/", async (req, res, next) => {

});

module.exports = userRouter;
