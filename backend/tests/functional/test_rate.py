from backend.app import create_app


def test_rate_page():
   
    flask_app = create_app('flask_test.cfg')
    
    validData = {
        'eventID': 2,
        'r': 5
    }

    
    with flask_app.test_client() as test_client:
        response = test_client.post('/search/rate', json=validData)
        assert response.status_code == 200

def test_rsvp_valid_response():
 
    flask_app = create_app('flask_test.cfg')
    
    validData = {
        'eventID': 2,
        'r': 5
    }

    
    with flask_app.test_client() as test_client:
        response = test_client.post('/search/rate', json=validData)
        assert response.json['res'] == "You rated this event!"

def test_rsvp_invalid_response():
 
    flask_app = create_app('flask_test.cfg')
    
    invalidData = {
     'un': 'csmit555',
     'attendance': "Yes"
    }

   
    with flask_app.test_client() as test_client:
        response = test_client.post('/search/rate', json=invalidData)
        assert response.json['res'] == "Error! Check that frontend is sending a json with eventID and Rate"