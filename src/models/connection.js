class Connection {
  //constructor
  constructor(id, title, host, category, details, dateAndTime, location) {
    this.id = id;
    this.title = title;
    this.host = host;
    this.category = category;
    this.details = details;
    this.dateAndTime = dateAndTime;
    this.location = location;
  }
  //getters and setters below

  getConnectionID() {
    return this.id;
  }

  setConnectionID(id) {
    this.id = id;
  }

  getConnectionTitle() {
    return this.title;
  }

  setConnectionTitle(title) {
    this.title = title;
  }

  getConnectionHost() {
    return this.host;
  }

  setConnectionHost(host) {
    this.host = host;
  }

  getConnectionCategory() {
    return this.category;
  }

  getConnectionDetails() {
    return this.details;
  }

  setConnectionDetails(details) {
    this.details = details;
  }

  getConnectionDateAndTime() {
    return this.dateAndTime;
  }

  getConnectionLocation() {
    return this.location;
  }

  setConnectionLocation(location) {
    this.location = location;
  }
}

module.exports = Connection;
