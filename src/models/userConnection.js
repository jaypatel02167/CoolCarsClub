//Going List
const connectionsList = [
  {
    username: 'j@gmail.com',
    id: 'clte',
    rsvp: 'Yes',
  },
  {
    username: 'j@gmail.com',
    id: 'europeanMeet',
    rsvp: 'Yes',
  },
];
//Maybe List
const maybeList = [
  {
    username: 'j@gmail.com',
    id: 'americanMeet',
    rsvp: 'Maybe',
  },
];

class userProfile {
  constructor(userID) {
    this.userID = userID;
  }

  getUserID() {
    return this.userID;
  }

  setUserID(userID) {
    this.userID = userID;
  }

  getGoingRSVP(userID, connection) {
    for (let x = 0; x < connectionsList.length; x++) {
      if (
        userID === connectionsList[x].username &&
        connection === connectionsList[x].id
      ) {
        return connectionsList[x].rsvp;
      }
    }
  }

  getMaybeRSVP(userID, connection) {
    for (let x = 0; x < maybeList.length; x++) {
      if (userID === maybeList[x].username && connection === maybeList[x].id) {
        return maybeList[x].rsvp;
      }
    }
  }

  getConnectionList() {
    return connectionsList;
  }

  getUserConnections(userID) {
    let tempList = [];
    for (let x = 0; x < connectionsList.length; x++) {
      if (userID === connectionsList[x].username) {
        tempList.push(connectionsList[x].id);
      }
    }
    return tempList;
  }

  getMaybeList(userID) {
    let tempList = [];
    for (let x = 0; x < maybeList.length; x++) {
      if (userID === maybeList[x].username) {
        tempList.push(maybeList[x].id);
      }
    }
    return tempList;
  }

  addConnection(userID, connection, rsvp) {
    let newConnection = { username: userID, id: connection, rsvp: rsvp };
    for (let x = 0; x < connectionsList.length; x++) {
      if (
        userID === connectionsList[x].username &&
        connection === connectionsList[x].id
      ) {
        return;
      }
    }
    connectionsList.push(newConnection);
  }

  removeConnection(userID, connection) {
    for (let x = 0; x < connectionsList.length; x++) {
      if (
        userID === connectionsList[x].username &&
        connection === connectionsList[x].id
      ) {
        connectionsList.splice(x, 1);
      }
    }

    for (let x = 0; x < maybeList.length; x++) {
      if (userID === maybeList[x].username && connection === maybeList[x].id) {
        maybeList.splice(x, 1);
      }
    }
  }

  addMaybeConnection(userID, connection, rsvp) {
    let newConnection = { username: userID, id: connection, rsvp: rsvp };
    for (let x = 0; x < maybeList.length; x++) {
      if (userID === maybeList[x].username && connection === maybeList[x].id) {
        return;
      }
    }
    maybeList.push(newConnection);
  }
}
module.exports = userProfile;
