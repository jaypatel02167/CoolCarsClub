//middleware to check if the user is logged in
let loginBar = function (req, res, next) {
  //if the user is logged in
  if (req.session.login != null) {
    //stores login info into res.locals
    res.locals.user = req.session.login;
  } else {
    //sets res.locals to null
    res.locals.user = null;
  }
  next();
};

module.exports = loginBar;
