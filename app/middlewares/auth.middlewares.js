const passport = require('passport');

const authMiddlewares = {
    jwt: (req, res, next) => {
        passport.authenticate('jwt', {session: false}, async (err, user, inf) => {
            if (user) {
                req.principal = user
                next()
            } else {
                return res.status(401).send();
            }
        })(req, res, next)
    },
    isAdmin: (req, res, next) => {
        let user = req.principal;
        let roles = user.roles;

        if (!roles || roles.filter(r => r.name === "admin").length < 1) {
            return res.status(403).send();
        }

        next()
    }
}

module.exports = authMiddlewares;