import os

from app import start_app

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

if __name__ == '__main__':
    app = start_app()
    app.run(host='0.0.0.0', port=5000)
