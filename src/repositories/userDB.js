const userSchema = require('../schema/userSchema.js');
class userDB {
  constructor(fName, lName, emailAdd, password) {
    this.fName = fName;
    this.lName = lName;
    this.emailAdd = emailAdd;
    this.password = password;
  }

  getUser(emailAdd) {
    let data = userSchema.find({ username: emailAdd });
    return data;
  }

  userSignUp(fName, lName, emailAdd, password) {
    let newUser = {
      fName: fName,
      lName: lName,
      username: emailAdd,
      password: password,
      connectionList: [],
    };

    userSchema.create(newUser);
  }

  login(emailAdd, password) {
    let letLogin = false;
    try {
      var data = userSchema.findOne({
        username: 'j@gmail.com',
      });
      // eslint-disable-next-line no-console
      //console.log(data);
      if (data.username === emailAdd && data.password === password) {
        letLogin = true;
      }
    } catch (err) {
      letLogin = false;
    }
    return letLogin;
  }

  getUserDB() {
    let data = userSchema.find({});
    return data;
  }
}
module.exports = userDB;
