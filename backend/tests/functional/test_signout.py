from backend.app import create_app


def test_signout_page():
    """
    GIVEN a Flask application configured for testing
    WHEN the '/user/signout' page is requested (POST)
    THEN check that the response is valid
    """
    flask_app = create_app('flask_test.cfg')
    # Create a test client using the Flask application configured for testing
    with flask_app.test_client() as test_client:
        response = test_client.post('/user/signout')
        assert response.json['login'] == False
