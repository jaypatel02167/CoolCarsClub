const indexRouter = require('./controllers/indexController');
const connectionRouter = require('./controllers/connectionController');
const loginRouter = require('./controllers/loginController');
const mongoDB = require('../src/config/mongoDB.js');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const app = express();
mongoDB();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/connection/assets', express.static(path.join(__dirname, 'assets')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: '5166',
    saveUninitialized: true,
    resave: false,
  }),
);

app.use('/connection', connectionRouter);
app.use('/login', loginRouter);
app.use('/', indexRouter);

app.listen(3000);
// eslint-disable-next-line no-console
console.log('Working');
