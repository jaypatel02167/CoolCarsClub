from backend.app import create_app

def test_search_page():
 
    flask_app = create_app('flask_test.cfg')
    
    validData = {
     'searchQuery': 'Event Title',
    }

   
    with flask_app.test_client() as test_client:
        response = test_client.post('/search/', json=validData)
        assert response.status_code == 200

def test_search_valid_response():

    flask_app = create_app('flask_test.cfg')
    
    validData = {
     'searchQuery': 'Test Event'
    }

  
    with flask_app.test_client() as test_client:
        response = test_client.post('/search/', json=validData)
        assert response.json['searchQuery'] == [[5, 'Test Event', 'Test Event', 5.0, 'CLT Meets', 'Uptown Charlotte', 'Wed, 30 Dec 2020 00:00:00 GMT', '11:00 PM']]

def test_search_invalid_response():
  
    flask_app = create_app('flask_test.cfg')
    
    validData = {
     'searchQuery': 'Test 123134123'
    }

   
    with flask_app.test_client() as test_client:
        response = test_client.post('/search/', json=validData)
        assert response.json['searchQuery'] == [['NO RESULT', 'Test 123134123']]