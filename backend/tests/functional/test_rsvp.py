from backend.app import create_app

def test_rsvp_page():
 
    flask_app = create_app('flask_test.cfg')
    
    validData = {
     'un': 'csmit555',
     'eventID': 1,
     'attendance': "Yes"
    }

    
    with flask_app.test_client() as test_client:
        response = test_client.post('/search/rsvp', json=validData)
        assert response.status_code == 200

def test_rsvp_valid_response():
 
    flask_app = create_app('flask_test.cfg')
    
    validData = {
     'un': 'csmit555',
     'eventID': 1,
     'attendance': "Yes"
    }

    
    with flask_app.test_client() as test_client:
        response = test_client.post('/search/rsvp', json=validData)
        assert response.json['res'] == "You have been RSVP'd!"

def test_rsvp_invalid_response():
  
    flask_app = create_app('flask_test.cfg')
    
    invalidData = {
     'un': 'csmit555',
     'attendance': "Yes"
    }

    
    with flask_app.test_client() as test_client:
        response = test_client.post('/search/rsvp', json=invalidData)
        assert response.json['res'] == "Error RSVPING, check to ensure frontend is sending a json with username, eventID, and attendance"