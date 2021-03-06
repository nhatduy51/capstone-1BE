const express = require("express");
const cors = require("cors");
const passport = require('passport');
const publicRoutes = require('./app/routes/public.routes');
const authenticatedRoutes = require('./app/routes/authenticated.routes');
const userRoutes = require('./app/routes/user.routes');
const doctorRoutes = require('./app/routes/doctor.routes');
const appointmentRoutes = require('./app/routes/appointment.routes');
const blogRoutes = require('./app/routes/blog.routes');
const authMiddlewares = require('./app/middlewares/auth.middlewares')
require('./app/auth/auth');

const app = express();

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */

const db = require("./app/models");

db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.use('/', publicRoutes);
app.use('/authenticated', authMiddlewares.jwt, authenticatedRoutes);
app.use('/users', authMiddlewares.jwt, userRoutes);
app.use('/doctors', authMiddlewares.jwt, doctorRoutes);
app.use('/appointments', authMiddlewares.jwt/*, authMiddlewares.isAdmin*/, appointmentRoutes);
app.use('/blogs', authMiddlewares.jwt, blogRoutes);
app.get('/abc', (req, res, next) => {
  passport.authenticate('jwt', { session: false }, async (err, user, inf) => {
    if(user) {
      req.principal = user
      next()
    }
  })(req, res, next)
}, (req, res, next) => {
  console.log('')
})

// require("./app/routes/turorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
