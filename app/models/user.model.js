module.exports = (sequelize, Sequelize) => {
  return sequelize.define("user", {
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    gender: {
      type: Sequelize.ENUM('MALE', 'FEMALE'),
    },
    phoneNumber: {
      type: Sequelize.STRING
    },
    image: {
      type: Sequelize.STRING
    },
    professionalTitle: {
      type: Sequelize.STRING
    }
  });
};
