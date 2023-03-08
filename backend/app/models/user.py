from flask import Blueprint, request
from backend.database.db import get_db

bp = Blueprint('user', __name__, url_prefix='/user')

@bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        json_data = request.get_json()
        username = json_data['username']
        password = json_data['password']

        db = get_db()
        query = db.execute("SELECT username, password FROM user where username = ? AND password = ?", (username, password))
        results = []
        for row in query:
            results.append(list(row))

        rowSize = len(results)
        print(rowSize)
        if(rowSize == 1):
            return {'login': True, 'username': username}

        else:
            return {'login': False}


@bp.route('/signup', methods=['POST'])
def signUp():
    if request.method == 'POST':
        json_data = request.get_json()
        print(json_data);
        db = get_db()
        sql = 'INSERT INTO user (firstName, lastName, email, username, password, car) VALUES (?, ?, ?, ?, ?, ?)'
        values = (json_data['firstName'], json_data['lastName'], json_data['email'],json_data['username'], json_data['password'], json_data['car'])
        db.execute(sql, values)
        db.commit()
    return {'signup': "success"}


@bp.route('/signout', methods=['POST'])
def signout():
    if request.method == 'POST':
        return {'login': False}


@bp.route('/myDashboard', methods=['POST'])
def myDashboard():
    if request.method == 'POST':
        yesRSVPList = []
        yesEventInfo = []
        noRSVPList = []
        noEventInfo = []
        maybeRSVPList = []
        maybeEventInfo = []
        hostedRSVPList = []
        hostedRSVPInfo = []
        json_data = request.get_json()
        username = json_data['username']
        db = get_db()

        yesRSVP = db.execute("SELECT EventID FROM RSVPEvents where username = ? and RSVP = ?", (username, "Yes"))
        for row in yesRSVP:
            yesRSVPList.append(list(row))

        for row in yesRSVPList:
            eventsTableInfo = db.execute("SELECT Title, rating FROM Events where EventID = ?", row)
            for row in eventsTableInfo:
                yesEventInfo.append(list(row))


        noRSVP = db.execute("SELECT EventID FROM RSVPEvents where username = ? and RSVP = ?", (username, "No"))
        for row in noRSVP:
            noRSVPList.append(list(row))

        for row in noRSVPList:
            eventsTableInfo = db.execute("SELECT Title, rating FROM Events where EventID = ?", row)
            for row in eventsTableInfo:
                noEventInfo.append(list(row))



        maybeRSVP = db.execute("SELECT EventID FROM RSVPEvents where username = ? and RSVP = ?", (username, "Maybe"))
        for row in maybeRSVP:
            maybeRSVPList.append(list(row))

        for row in maybeRSVPList:
            eventsTableInfo = db.execute("SELECT Title, rating FROM Events where EventID = ?", row)
            for row in eventsTableInfo:
                maybeEventInfo.append(list(row))
        

        
        hostedEvents = db.execute("SELECT EventID FROM HostedEvents where username = ?", [username])
        for row in hostedEvents:
            hostedRSVPList.append(list(row))

        for row in hostedRSVPList:
            eventsTableInfo = db.execute("SELECT Title, rating FROM Events where EventID = ?", row)
            for row in eventsTableInfo:
                hostedRSVPInfo.append(list(row))

        
        return {'yesEventInfo': yesEventInfo, 'noEventInfo': noEventInfo, 'maybeEventInfo': maybeEventInfo, 'hostedRSVPInfo': hostedRSVPInfo}
        
