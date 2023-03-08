from backend.app import create_app

def test_filter_page():
 
    flask_app = create_app('flask_test.cfg')
    
    validData = {
     'filterInput': 'Event Title',
    }

    with flask_app.test_client() as test_client:
        response = test_client.post('/search/filter', json=validData)
        assert response.status_code == 200

def test_filter_valid_response():

    flask_app = create_app('flask_test.cfg')
    
    validData = {
     'filterInput': 'Test Event'
    }

    with flask_app.test_client() as test_client:
        response = test_client.post('/search/filter', json=validData)
        assert response.json['searchQuery'] == [[5, 'Test Event', 'Test Event', 5.0, 'CLT Meets', 'Uptown Charlotte', 'Wed, 30 Dec 2020 00:00:00 GMT', '11:00 PM']]

def test_filter_clear_response():
  
    flask_app = create_app('flask_test.cfg')
    
    validData = {
     'filterInput': ''
    }

    with flask_app.test_client() as test_client:
        response = test_client.post('/search/filter', json=validData)
        assert response.json['filterInput'] == ''

def test_filter_invalid_response():
  
    flask_app = create_app('flask_test.cfg')
    
    validData = {
     'filterInput': 'Test123123'
    }

    with flask_app.test_client() as test_client:
        response = test_client.post('/search/filter', json=validData)
        assert response.json['searchQuery'] == []