const models = require('../models');
const bcrypt = require('bcrypt');
const jwtUtils = require('../jwtUtils');
const asyncLib = require('async');
const { getUserId, getInfosUserFromToken } = require('../jwtUtils');
const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const PASSWORD_REGEX = /^(?=.*\d).{6,10}$/;
const maxAge = 3 * 24 * 60 * 60 * 1000;


module.exports = {

    register: (req, res) => {
        const {nom, prenom, dateNaissance, email, password, department} = req.body
        
        if (
            !req.body.nom ||
            !req.body.prenom ||
            !req.body.dateNaissance ||
            !req.body.email ||
            !req.body.password ||
            !req.body.department
          ) {
            return res
              .status(400)
              .json({error: 'Champs Invalides'})
          }

        if(!EMAIL_REGEX.test(email)) {
            return res.status(400).json({'error': 'Email not valid'})
        }

        if(!PASSWORD_REGEX.test(password)) {
            return res.status(400).json({'error': 'Password not valid'})
        }

        asyncLib.waterfall([
            (done) => {
                //Search if user email already exists
                models.Users.findOne({
                    attributes: ['email'],
                    where: { email: email }
                })
                .then((userFound) => {
                    done(null, userFound)
                })
                .catch((err) => {
                    console.log(err);
                })
            },
            (userFound, done) => {
                //If user not exists, we hash password and passing for next function
                if(!userFound) {
                    bcrypt.hash(password, 6, (err, bcryptedPassword) => {
                        done(null, userFound, bcryptedPassword)
                    })
                }
                else {
                    return res.status(409).json({'error': "Cet email est déjà enregistré"})
                }
            },
            (userFound, bcryptedPassword, done) => {
                //Creating user with hash password and with the data that we declare with variables 
                let newUser = models.Users.create({
                    nom: nom,
                    prenom: prenom,
                    dateNaissance: dateNaissance,
                    email: email,
                    password: bcryptedPassword,
                    department: department
                })
                //If user created with success we avance for next function
                .then((newUser) => {
                    done(newUser)
                })
                .catch((err) => {
                    return res.status(400).json({'error': 'An error occurred'})
                })
            }
        ], (newUser) => {
                //Handling errors
                if(newUser){
                    return res.status(201).json({'success': 'user successfuly created'})
                }
                else {
                    return res.status(400).json({ 'error': 'An error occurred'})
                }
            }
        )
    },

    login: (req, res) => {
    
        // Params
        const { email, password } = req.body
    
        if (email == null ||  password == null) {
          return res.status(400).json({ 'error': 'Paramètres manquants' });
        }
    
        asyncLib.waterfall([
          (done) => {
            models.Users.findOne({
                where: { email: email }
            })
            .then((userFound) => {
                done(null, userFound);
            })
            .catch((err) => {
                return res.status(500).json({ error: 'unable to verify user' });
            });
          },
          (userFound, done) => {
            if (userFound) {
                //Compare for checking if the user had put the goood password
                bcrypt.compare(password, userFound.password, (errBycrypt, resBycrypt) => {
                done(null, userFound, resBycrypt);
                });
            } 
            else {
                return res.status(404).json({ 'error': 'Email ou password ne sont pas valides' });
            }
          },
          (userFound, resBycrypt, done) => {
            if(resBycrypt) {
              done(userFound);
            } 
            else {
              return res.status(403).json({ 'error': 'invalid password' });
            }
          }
        ], 
        (userFound) => {
            if (userFound) {
                const token = jwtUtils.generateTokenForUser(userFound)
                res.cookie('jwt', token, { ly: true, maxAge});
                res.status(201).json(userFound.id);

            } 
            else {
                return res.status(500).json({ 'error': 'cannot log on user' });
            }
        });
    },

    updateUser: (req, res) => {
        //Using token for having data of the actual user without another login
        const token = req.cookies.jwt
        const userId = getUserId(token)

        const {nom, prenom, dateNaissance, department} = req.body
        //const profilImage = req.file.profilImage;

        asyncLib.waterfall([
            (done) => {
                models.Users.findByPk(userId)
                .then((userFound) => {
                    done(null, userFound);
                })
                .catch((err) => {
                    return res.status(400).json({ 'error': 'Unable to verify user' });
                });
            },
            (userFound, done) => {
              if(userFound) {

                
                //Updating all data even the older that the user don't change
                userFound.update({
                    nom: (nom ? nom : userFound.nom),
                    prenom: (prenom ? prenom : userFound.prenom),
                    dateNaissance: (dateNaissance ? dateNaissance : userFound.dateNaissance),
                    //profilImage: (profilImage ? profilImage : userFound.profilImage),
                    department: (department ? department : userFound.department)
/*                     email: (email ? email : userFound.email),
                    password: (password ? password : userFound.password) */
                })
                .then((userFound) => {
                    done(userFound);
                })
                .catch((err) => {
                    res.status(400).json({ 'error': 'An error occurred' });
                });
              }
              else {
                res.status(404).json({ 'error': 'An error occurred' });
              }
            }
          ], 
            (userFound) => {
            //Handling errors
                if (userFound) {
                    res.status(200).json({'success': 'User successfuly modified'})
                } 
                else {
                    return res.status(400).json({ 'error': 'An error occurred' });
                }
            }
        );
    },

    deleteUser: (req, res) => {
        const token = req.cookies.jwt;
        const user = getInfosUserFromToken(token);
        const compte = req.params.id

        models.Users.findByPk(compte)
        .then((compte) => {
            if(compte && compte.id === user.id || user.isAdmin === true) {
                compte.destroy({
                    where: { id: compte}
                })
                .then(() => {
                    res.status(200).json({'success': 'Compte suprimmé'})
                })
                .catch((err) => {
                    console.log(err);
                    res.status(400).json({'error': 'Impossible de supprimmer compte'})
                })
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({'error': 'Impossible de supprimmer compte'})
        })
    },

    logout: (req, res) => {
        const maxAge = 1;
        res.cookie('jwt', '', { maxAge: 1 });
        res.redirect('/');
    },

    getUser: (req, res) => {
        let userId = req.params.id
        
        //Getting users by the id gaved on url
        models.Users.findOne({
            attributes: [ 'id', 'nom', 'prenom', 'email', 'dateNaissance', 'department', 'profilImage', 'isAdmin'],
            where: { id: userId }
          })
          .then((user) => {
            if (user) {
              res.status(201).json(user);
            }
            else {
              res.status(404).json({ 'error': 'User not found' });
            }
          })
          .catch((err) => {
            res.status(500).json({ 'error': 'Cannot fetch user' });
          });
      },
      
    getAllUsers: (req, res) => {
        models.Users.findAll({
            attributes: [ 'id', 'nom', 'prenom', 'email', 'dateNaissance', 'department', 'profilImage']
        })
        .then((users) => {
            res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
            res.setHeader('Content-Range', 5);
            res.status(200).json(users)
        })
        .catch((err) => {
            res.status(400).json({ 'error': 'An error occurred' });
        });
    },
    
    updatePic: (req, res) => {

        const token = req.cookies.jwt
        const userId = getUserId(token)
        const imgsrc = req.file.filename


        asyncLib.waterfall([
            (done) => {
                models.Users.findByPk(userId)
                .then((userFound) => {
                    console.log(userFound);
                    done(null, userFound);
                })
                .catch((err) => {
                    console.log(err);
                    return res.status(400).json({ 'error': 'Unable to verify user' });
                });
            },
            (userFound, done) => {
              if(userFound) {

                
                //Updating all data even the older that the user don't change
                if (!req.file) {
                    console.log("No file upload");
                } else {
                    userFound.update({
                        profilImage: (imgsrc ? imgsrc : userFound.profilImage),
                    })
                    .then((userFound) => {
                        done(userFound);
                    })
                    .catch((err) => {
                        res.status(400).json({ 'error': 'An error occurred' });
                    });
                }
              }
              else {
                res.status(404).json({ 'error': 'An error occurred' });
              }
            }
          ], 
            (userFound) => {
            //Handling errors
                if (userFound) {
                    res.status(200).json({'success': 'User successfuly modified'})
                } 
                else {
                    return res.status(400).json({ 'error': 'An error occurred' });
                }
            }
        )
      }
}