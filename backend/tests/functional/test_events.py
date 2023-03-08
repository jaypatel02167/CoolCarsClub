from backend.app import create_app
from backend.app.models import events
from unittest.mock import MagicMock, patch
import json

"""
    GIVEN a Flask application configured for testing
    WHEN the '/events/all' page is requested (GET)
    THEN check that the proper status and  json response is returned
"""


def test_events_status_code():
    flask_app = create_app('flask_test.cfg')
    with flask_app.test_client() as test_client:
        response = test_client.get('/events/all')
        assert response.status_code == 200


@patch.object(events, 'get_db')
def test_returns_all_events(mock_db):

    flask_app = create_app('flask_test.cfg')
    db_connection = MagicMock()
    mock_db.return_value = db_connection

    mock_cursor = MagicMock()
    db_connection.execute.return_value = mock_cursor
    mock_cursor.fetchall.return_value = [['Exotic Meets', 'Car Meet for exotic cars', 9.0,
                                          'CLT Meets', 'Uptown Charlotte', '2020, 12, 30', '11:00 PM'],
                                        ['Exotic Meets', 'Car Meet for exotic cars', 9.0,
                                         'CLT Meets', 'Uptown Charlotte', '2020, 12, 30', '11:00 PM']]

    with flask_app.test_client() as test_client:
        response = test_client.get('/events/all')
        assert response.status_code == 200

        res = response.data.decode('utf8').replace("'", '"')
        assert json.loads(res) == {'eventsQuery': [{'date': '2020, 12, 30',
                  'description': 'Car Meet for exotic cars', 'host': 'CLT Meets', 'location': 'Uptown Charlotte',
                  'rating': 9.0, 'time': '11:00 PM', 'title': 'Exotic Meets'},
                 {'date': '2020, 12, 30', 'description': 'Car Meet for exotic cars', 'host': 'CLT Meets',
                  'location': 'Uptown Charlotte', 'rating': 9.0, 'time': '11:00 PM', 'title': 'Exotic Meets'}]}


@patch.object(events, 'get_db')
def test_returns_no_events(mock_db):

    flask_app = create_app('flask_test.cfg')
    db_connection = MagicMock()
    mock_db.return_value = db_connection

    mock_cursor = MagicMock()
    db_connection.execute.return_value = mock_cursor

    with flask_app.test_client() as test_client:
        response = test_client.get('/events/all')

    # testing the same endpoint if no data exists in the db
    mock_cursor.fetchall.return_value = None
    with flask_app.test_client() as test_client:
        response = test_client.get('/events/all')
        res = response.data.decode('utf8').replace("'", '"')
        assert json.loads(res) == {'eventsQuery': ['No results found for Events']}
