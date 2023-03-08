from backend.app import create_app


def test_signup_page():
    """
    GIVEN a Flask application configured for testing
    WHEN the '/user/signup' page is requested (POST)
    THEN check that the response is valid
    """
    flask_app = create_app('flask_test.cfg')
    validLoginData = {
        'firstName': 'Caleb',
        'lastName': 'Smith',
        'email': 'csmith@uncc.edu',
        'username': 'csmith',
        'password': 'P@ssw0rd',
        'car': 'BMW M5'
    }
    # Create a test client using the Flask application configured for testing
    with flask_app.test_client() as test_client:
        response = test_client.post('/user/signup', json=validLoginData)
        assert response.status_code == 200
        assert response.json['signup'] == 'success'
