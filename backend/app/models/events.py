
from flask import Blueprint, json, request
from backend.database.db import get_db

bp = Blueprint('events', __name__, url_prefix='/events')


@bp.route('/all', methods=['GET', 'POST'])
def allevents():
    db = get_db()
    sql = "select Title, EventDescription, rating, Host, Location, EventDate, EventTime from events"
    results = db.execute(sql).fetchall()

    if not results:
        return {'eventsQuery': ["No results found for Events"]}
    response = []
    for i in results:
        response.append({
            'title': i[0],
            'description': i[1],
            'rating': i[2],
            'host': i[3],
            'location': i[4],
            'date': i[5],
            'time': i[6]
        })

    return {'eventsQuery': response}


@bp.route('/topEvents', methods=['GET'])
def topThreeEvents():
    if request.method == 'GET':
        results = []
        details = []
        db = get_db()

        eventsRatings = db.execute("SELECT EventID,rating FROM Events WHERE rating IS NOT NULL")
        for row in eventsRatings:
            results.append(list(row))
        
        results = sorted(results,key=lambda l:l[1], reverse=True)

        for row in results:
            eventsTableInfo = db.execute("SELECT Title, EventDescription, rating, Host, Location, EventDate, EventTime FROM Events where EventID = ?", (row[0],))
            for row in eventsTableInfo:
                details.append(list(row))
        
        return {'details': details}

@bp.route('/create', methods=['GET', 'POST'])
def create_event():
    if request.method == 'POST':
        json_data = request.get_json();
        new_json = []
        print(json_data)
        db = get_db()
        sql = 'INSERT INTO Events(Title, EventDescription, Location, Host, EventDate, EventTime) VALUES (?, ?, ?, ?, ?, ?)'
        values = (
            json_data['eventtitle'], json_data['eventdescription'], json_data['location'],
            json_data['host'], json_data['eventDate'], json_data['timeofevent'])
        db.execute(sql, values)
        db.commit()
        hosted = db.execute('SELECT EventID FROM Events WHERE Host = ?', (json_data['host'],))
        for row in hosted:
            new_json.append(list(row))
        sql = 'INSERT INTO HostedEvents(Username, EventID) VALUES (?, ?)'
        values = (json_data['host'], new_json[-1][0])
        print(new_json[-1][0])
        db.execute(sql, values)
        db.commit()
        results = {'CreateEventText': 'Event Created Successfully'}
        return results
