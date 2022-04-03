const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require("../models");
const User = db.user;
const Role = db.role;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const bcrypt = require("bcrypt");

passport.use(
    'signup',
    new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req, username, password, done) => {
            try {
                const existed = await User.findOne({ where: { username } })
                if(existed) {
                    return done(new Error('User existed'))
                }

                password = await bcrypt.hash(password, 10);
                const user = await User.create({ username, password, name: req.body.name ? req.body.name : null });

                const roles = await Role.findAll({
                    where: {
                        name: req.body.roles
                    }
                });

                if(roles) {
                    await user.setRoles(roles)
                }

                return done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.use(
    'login',
    new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        },
        async (username, password, done) => {
            try {
                const user = await User.findOne({ where: { username } });

                if (!user) {
                    return done(null, false, { message: 'User not found' });
                }

                const validate = await isValidPassword(user, password);

                if (!validate) {
                    return done(null, false, { message: 'Wrong Password' });
                }

                return done(null, user, { message: 'Logged in Successfully' });
            } catch (error) {
                return done(error);
            }
        }
    )
);

isValidPassword = async function (user, password) {
    return await bcrypt.compare(password, user.password);
};

passport.use(
    new JWTStrategy(
        {
            secretOrKey: 'TOP_SECRET',
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
        },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                done(error);
            }
        }
    )
);