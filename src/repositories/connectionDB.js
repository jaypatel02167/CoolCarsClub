const connectionSchema = require('../schema/connectionSchema.js');
class ConnectionDB {
  constructor(ID, title, host, category, details, dateAndTime, location) {
    this.ID = ID;
    this.title = title;
    this.host = host;
    this.category = category;
    this.details = details;
    this.dateAndTime = dateAndTime;
    this.locaiton = location;
  }

  async getConnections() {
    try {
      let data = await connectionSchema.find({});
      return data;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      return;
    }
  }

  async getConnection(id) {
    let data = await connectionSchema.findOne({ username: id });
    return data;
  }
}
module.exports = ConnectionDB;
