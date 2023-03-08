from backend.app import create_app


def test_valid_login_page():
    """
    GIVEN a Flask application configured for testing
    WHEN the '/user/login' page is requested (POST)
    THEN check that the response is valid
    """
    flask_app = create_app('flask_test.cfg')
    validLoginData = {
         'username': 'jpate118',
         'password': 'P@ssw0rd'
    }
    invalidLoginData = {
         'username': 'jpate119',
         'password': 'P@ssw0rd'
    }
    #Create a test client using the Flask application configured for testing
    with flask_app.test_client() as test_client:
        #Checks if response code and return statement are 200 and True if you enter a valid username and password
        response = test_client.post('/user/login', json=validLoginData)
        assert response.status_code == 200
        assert response.json['login'] == True;




        response = test_client.post('/user/login', json=invalidLoginData)
        assert response.status_code == 200
        assert response.json['login'] == False;

def test_invalid_login_page():
    """
    GIVEN a Flask application configured for testing
    WHEN the '/user/login' page is requested (POST)
    THEN check that the response is valid
    """
    flask_app = create_app('flask_test.cfg')
    invalidLoginData = {
         'username': 'jpate119',
         'password': 'P@ssw0rd'
    }
    #Create a test client using the Flask application configured for testing
    with flask_app.test_client() as test_client:

        response = test_client.post('/user/login', json=invalidLoginData)
        assert response.status_code == 200
        assert response.json['login'] == False;