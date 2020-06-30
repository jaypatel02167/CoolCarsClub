const express = require('express');
const userSchema = require('../schema/userSchema.js');
const connections = require('../schema/connectionSchema.js');
const { check, validationResult } = require('express-validator');
const loginBar = require('../middleware/loginBar');
const router = express.Router();

//middleware for user navbar
router.use(loginBar);

//post request for signup page, validates inputs to make sure they are the proper
router.post(
  '/signup',
  [
    check('fName').exists().isAlpha(),
    check('lName').exists().isAlpha(),
    check('username').isEmail().exists(),
    check('password').isLength({ min: 8 }).exists(),
  ],
  (req, res) => {
    //if one of the inputs was not valid, it will render signUpFailed page
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('signUpFailed');
    }

    let fName = req.body.fName;
    let lName = req.body.lName;
    let username = req.body.emailAdd;
    let password = req.body.password;
    //stores user into session
    req.session.login = { uName: username, password: password };

    //creates user in database
    userSchema.create({
      fName: fName,
      lName: lName,
      username: username,
      password: password,
      connectionList: [],
    });

    req.session.login = { uName: username, password: password };
    res.locals.user = req.session.login;
    res.redirect('connection/myConnections');
  },
);

//get request for signup page
router.get('/signup', (req, res) => {
  res.render('signup');
});

//post request for newConnection and checks if all of the inputs are valid
router.post(
  '/newConnection',
  [
    check('ID').isAlphanumeric().exists(),
    check('title').isAlphanumeric().exists(),
    check('host').exists().isAlphanumeric(),
    check('category').isAlpha().exists(),
    check('details').isAlphanumeric().exists(),
    check('dateAndTime').exists(),
    check('location').isAlpha().exists(),
  ],
  async (req, res) => {
    //if one of the inputs was not valid, it will render signUpFailed page
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('newConnection', {
        message: 'One of the inputs was invalid!',
      });
    }
    //checks to see if user is logged in
    if (res.locals.user != null) {
      let userID = res.locals.user.uName;
      //creates new connection object
      let newConnection = new connections({
        ID: req.body.mID,
        title: req.body.mName,
        host: req.body.host,
        category: req.body.category,
        details: req.body.details,
        dateAndTime: req.body.date,
        location: req.body.location,
      });
      //creates connection entry in databse
      await connections.create(newConnection);

      //update the users connectionsList to have the new connection they added.
      await userSchema.findOneAndUpdate(
        { username: userID },
        {
          $push: {
            connectionList: { connectionID: req.body.mID, rsvp: 'Yes' },
          },
        },
      );

      res.redirect('/connection/myConnections');
    } else {
      res.render('login');
    }
  },
);

//get request for index page
router.get('/', (req, res) => {
  res.render('index');
});

//get request for newConnection page
router.get('/newConnection', (req, res) => {
  res.render('newConnection');
});

//get request for about page
router.get('/about', (req, res) => {
  res.render('about');
});

//get request for login page
router.get('/login', (req, res) => {
  res.render('login');
});

//get request for connections page
router.get('/connections', async (req, res) => {
  try {
    //gets all of the connections from the connection database
    var data = await connections.find();

    res.render('connections', { data: data });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('Fail');
  }
});

//get request for signout page
router.get('/signout', (req, res) => {
  req.session.login = null;
  res.redirect('/');
});

module.exports = router;
