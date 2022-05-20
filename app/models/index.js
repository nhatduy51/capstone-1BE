const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.blog = require("./blog.model.js")(sequelize, Sequelize);
db.appointment = require("./appointment.model.js")(sequelize, Sequelize);

db.user.hasMany(db.blog);
db.user.hasMany(db.appointment, {
  foreignKey: 'userId',
  as: 'userAppointments'
})
db.user.hasMany(db.appointment, {
  foreignKey: 'doctorId',
  as: 'doctorAppointments'
})
db.user.belongsToMany(db.role, { as: 'roles', through: 'user_role' });

db.role.belongsToMany(db.user, { through: 'user_role' })
db.blog.belongsTo(db.user);

db.appointment.belongsTo(db.user, {
  foreignKey: 'userId',
  as: 'user'
})
db.appointment.belongsTo(db.user, {
  foreignKey: 'doctorId',
  as: 'doctor'
})

module.exports = db;
