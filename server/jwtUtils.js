var jwt = require('jsonwebtoken');
const models = require('./models');

const JWT_SIGN_SECRET = '<JWT_SIGN_TOKEN>';

module.exports = {

    generateTokenForUser: (userData) => {
        return jwt.sign({
            userId: userData.id,
            isAdmin: userData.isAdmin
        },
        JWT_SIGN_SECRET)
    },
    
    parseAuthorization: (authorization) => {
      return (authorization != null) ? authorization.replace('Bearer ', '') : null;
    },

    getUserId: (token) => {
        let userId = -1; //Default value for security

        if (token != null) {
            try {
                let jwtToken = jwt.verify(token, JWT_SIGN_SECRET);

                if (jwtToken != null) {
                    userId = jwtToken.userId;
                }
            }
            catch (err) {
                console.log(err)
            }
        }   
        return userId;
    },

    checkUser: (req, res, next) => {
        const token = req.cookies.jwt;

        if (token) {
            jwt.verify(token, JWT_SIGN_SECRET, async (err, decodedToken) => {

                if (!err) {
                    let user = await models.Users.findByPk(decodedToken.userId);
                    res.locals.user = user;
                    next();
                  } else {
                    res.locals.user = null;
                    next();
                  }
                });
              } else {
                res.locals.user = null;
                next();
        }
    },

    requireAuth: (req, res, next) => {
        const token = req.cookies.jwt;

        if (token) {
          jwt.verify(token, JWT_SIGN_SECRET, (err, decodedToken) => {
            if (err) {
              res.send(200).json('no token' + 'require')
            } else {
              next();
            }
          });
        } else {
          console.log('No token' + "No TOken");
        }
    },

    getInfosUserFromToken: (token) => {
      try {
        let userId = -1;
        const decodedToken = jwt.verify(token, JWT_SIGN_SECRET);
        let userInfos = {
          id :decodedToken.userId,
          isAdmin : decodedToken.isAdmin
        }
        userId = decodedToken.userId;
        // admin = decodedToken.admin;
        if (userId == -1) {
          throw "Invalid user ID";
        } else {
          return userInfos;
        }
      } catch (error) {
        console.log(error)
      }
    }
}