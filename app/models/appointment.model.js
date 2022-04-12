module.exports = (sequelize, Sequelize) => {
  return sequelize.define("appointment", {
    startTime: {
      type: Sequelize.DATE
    },
    endTime: {
      type: Sequelize.DATE
    },
    status: {
      type:   Sequelize.ENUM('CREATED', 'CONFIRMED', 'DONE'),
      defaultValue: "CREATED"
    }
  });
};
