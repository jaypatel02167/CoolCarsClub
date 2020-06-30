const express = require('express');
const userSchema = require('../schema/userSchema.js');
const loginBar = require('../middleware/loginBar');
const { check, validationResult } = require('express-validator');
const router = express.Router();

//middleware for user navbar
router.use(loginBar);

//post request for login page and valids inputs
router.post(
  '/',
  [
    //makes sure the input isnt empty and is an email
    check('uName').isEmail().exists(),
    //makes sure the isn't empty and a minimum length of 8
    check('password').isLength({ min: 8 }).exists(),
  ],
  async (req, res) => {
    //if one of the inputs was not valid, it will render signUpFailed page
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('loginFailed');
    }

    try {
      //gets the user from the database by the username
      var data = await userSchema.findOne({
        username: req.body.uName,
      });

      //if the username and password match, it will store it into a session
      if (
        data.username === req.body.uName &&
        data.password === req.body.password
      ) {
        //stores user info into session
        req.session.login = {
          uName: req.body.uName,
          password: req.body.password,
        };
        res.redirect('/connection/myConnections');
      }
    } catch (err) {
      res.render('login');
    }
  },
);

//get request for login page
router.get('/', (req, res) => {
  res.render('login');
});

module.exports = router;
