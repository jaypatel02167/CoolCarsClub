const express = require('express');
const connectionSchema = require('../schema/connectionSchema.js');
const userSchema = require('../schema/userSchema.js');
const loginBar = require('../middleware/loginBar');

const router = express.Router();

//middleware for loginBar
router.use(loginBar);

//post request for single connection page
router.post('/myConnections/:id', async (req, res) => {
  let userID = res.locals.user.uName;
  let connectionID = req.params.id;

  //finds the conenction and updates the rsvp for the user
  await userSchema.findOneAndUpdate(
    { username: userID },
    { $pull: { connectionList: { connectionID: connectionID } } },
  );
  res.redirect('/connection/myConnections');
});

//get request for newConnection page
router.get('/myConnections', async (req, res) => {
  try {
    let connectionInfo = [];
    let rsvp = [];
    let userID = res.locals.user.uName;
    //finds user object
    let data = await userSchema.findOne({ username: userID });

    //stores into list
    let userArray = data.connectionList;
    //gets all of the connections
    let connections = await connectionSchema.find({});

    //checks to see if the rsvp is the same as the users
    for (let x = 0; x < userArray.length; x++) {
      for (let y = 0; y < connections.length; y++) {
        if (userArray[x].connectionID === connections[y].ID) {
          //adds rsvp and connectionInfo to list for displaying
          connectionInfo.push(connections[y]);
          rsvp.push(userArray[x].rsvp);
        }
      }
    }

    res.render('myConnections', {
      data: connectionInfo,
      rsvp: rsvp,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('Fail');
  }
});

//get request for about page
router.get('/about', (req, res) => {
  res.render('about');
});

//post request for updating values for connection
router.post('/:id', async (req, res) => {
  //checks to see if the user is logged in
  if (res.locals.user != null) {
    let userID = res.locals.user.uName;
    let id = req.body.cID;
    let rsvp = req.body.rsvp;

    let userArray = [];
    //finds user entry
    let doc = await userSchema.findOne({ username: userID });
    //stores it into a list
    userArray = doc.connectionList;
    //maps each data point from the array
    let data = userArray.map((obj) => {
      return obj.connectionID;
    });

    //if the id is within the user it will run the if statement
    if (data.includes(id)) {
      //updates connection info for user if it has to be updated
      for (var x = 0; x <= data.length; x++) {
        if (id == data[x]) {
          doc.connectionList[x].rsvp = rsvp;
          await userSchema.findOneAndUpdate({ username: userID }, doc);
          res.redirect('myConnections');
        }
      }
    } else {
      //adds it to the user list
      await userSchema.findOneAndUpdate(
        { username: userID },
        { $push: { connectionList: { connectionID: id, rsvp: rsvp } } },
      );
      res.redirect('myConnections');
    }
  } else {
    res.render('login');
  }
});

//get request for connection page
router.get('/:id', async (req, res) => {
  var id = req.params.id;
  res.locals.cID = id;
  //gets connection
  var data = await connectionSchema.findOne({ ID: id });
  //stores conenction info into res.locals
  res.locals.connectionInfo = data;

  res.render('connection', {
    data: data,
  });
});

module.exports = router;
