import os, sys

from flask import Flask, render_template
from flask_assets import Environment, Bundle
from flask_cors import CORS
# from flask_session import Session

import routes as routes

assets = Environment()
# sess = Session()


def start_app(db_uri='any'):

    backend = Flask(__name__)
    backend.config.from_object('default_config')
    # backend.config.from_pyfile(os.path.join(backend.instance_path, 'config.py'))

    # sess.init_app(backend)
    CORS(backend)

    # Register Blueprints
    backend.register_blueprint(routes.routes)

    @backend.teardown_request
    def shutdown_session(exception=None):
        return

    @backend.errorhandler(404)
    def page_not_found(e):
        return render_template('404.html')

    @backend.errorhandler(500)
    def internal_error(exception):
        backend.logger.exception(exception)
        return "Some Internal error has taken place."

    # Extensions registration
    assets.init_app(backend)

    # CSS assets registration
    css = Bundle('css/base.css')
    assets.register('css_all', css)

    # JS assets registration
    js = Bundle('js/base.js')
    assets.register('js_all', js)

    return backend
