import os
from flask import Flask



def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(DATABASE=os.path.join(app.instance_path, 'backend.database.sqlite'),)

    try:
        os.makedirs(app.instance_path)
    except:
        pass

    from backend.database import db
    db.init_app(app)

    # Creating blueprint for search
    from backend.app.models import search
    from backend.app.models import user
    from backend.app.models import events
    app.register_blueprint(search.bp)
    app.register_blueprint(user.bp)
    app.register_blueprint(events.bp)

    return app
