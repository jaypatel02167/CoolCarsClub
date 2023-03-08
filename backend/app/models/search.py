from os import truncate
from flask import Blueprint, json, request
from backend.database.db import get_db

bp = Blueprint('search', __name__, url_prefix='/search')

@bp.route('/', methods=['GET', 'POST'])
def search():
    if request.method == 'POST':
        db = get_db()
        json_data = request.get_json();
        query = db.execute("SELECT * FROM events WHERE Title LIKE ?", ('%'+json_data['searchQuery']+'%',)).fetchall()
        results = []
        for row in query:
            results.append(list(row))
        if not results:
            noResult = {'searchQuery': (("NO RESULT", json_data['searchQuery']),)}
            return noResult
        results = {'searchQuery': results}
        print(results)
        return results
    elif request.method == 'GET':
        return {'Res': "Operational"}

@bp.route('/filter', methods=['GET', 'POST'])
def filter():
    if request.method == 'POST':
        db = get_db()
        json_data = request.get_json();
        query = db.execute("SELECT * FROM events WHERE Title LIKE ?", ('%'+json_data['filterInput']+'%',)).fetchall()
        results = []
        for row in query:
            results.append(list(row))
        if (json_data['filterInput'] == ''):
            return {'filterInput': ''}
        results = {'searchQuery': results}
        return results
    elif request.method == 'GET':
        return {'Res': "Operational"}

@bp.route('/rate', methods=['GET', 'POST'])
def rate():
    if request.method == 'POST':
        db = get_db()
        json_data = request.get_json();
        print(json_data)
        try:
            sql = 'INSERT INTO Rating (eventID, rating) VALUES (?, ?)'
            values = (json_data['eventID'], json_data['r'])
            db.execute(sql, values)
            db.commit()
            caluclateAvgRate()
            return {'res': "You rated this event!"}
        except:
            return {'res': "Error! Check that frontend is sending a json with eventID and Rate"}
    
    elif request.method == 'GET':
        return {'Res': "Operational"}

def caluclateAvgRate():
    try:
        db = get_db()
        query = db.execute("SELECT EventID FROM Rating").fetchall()
        results = []
        eventID = []
        rating = []
        for row in query:
            results.append(list(row))
        for x in results:
            if x not in eventID:
                eventID.append(x)
        for x in eventID:
            query = db.execute("SELECT * FROM Rating WHERE EventID = ?", (x[0],)).fetchall()
            sum = 0.0
            for row in query:
                rating.append(list(row))
            for row in rating:
               sum = sum + row[1]
            avg = sum / len(rating)
            sql = 'UPDATE Events SET rating = ? WHERE EventID = ?'
            values = (avg, x[0])
            db.execute(sql, values)       
            db.commit()
    except:
        return{'res': 'Rating not updated.'}

@bp.route('/rsvp', methods=['GET', 'POST'])
def rsvp():
    if request.method == 'POST':
        db = get_db()
        json_data = request.get_json()
        print(json_data)
        try:
            sql = 'INSERT INTO RSVPEvents (username, eventID, rsvp) VALUES (?, ?, ?)'
            values = (json_data['un'], json_data['eventID'], json_data['attendance'])
            db.execute(sql, values)
            db.commit()
            return {'res': "You have been RSVP'd!"}
        except:
            return{'res': "Error RSVPING, check to ensure frontend is sending a json with username, eventID, and attendance"}
    elif request.method == 'GET':
        return {'Res': "Operational"}