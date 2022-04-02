module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    userName: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    displayName: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.BOOLEAN
    }
  });


  return User;
};
