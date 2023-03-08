from backend.app import create_app

def test_login_page():
    """
    GIVEN a Flask application configured for testing
    WHEN the '/user/login' page is requested (GET)
    THEN check that the response is valid
    """
    flask_app = create_app('flask_test.cfg')
    #Create a test client using the Flask application configured for testing
    with flask_app.test_client() as test_client:
        #Checks if response code and return statement are 200 and True if you enter a valid username and password
        response = test_client.get('/events/topEvents')
        assert response.status_code == 200
