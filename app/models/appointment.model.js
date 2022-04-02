module.exports = (sequelize, Sequelize) => {
  const Appointment = sequelize.define("appointment", {
    startTime: {
      type: Sequelize.DATE
    },
    endTime: {
      type: Sequelize.DATE
    },
    content: {
      type: Sequelize.TEXT
    }
  });

  return Appointment;
};
