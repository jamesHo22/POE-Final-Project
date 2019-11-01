# Tutorial from https://flask-socketio.readthedocs.io/en/latest/
from flask import Flask, render_template
from flask_socketio import SocketIO

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@app.route('/')
def hello():
    return render_template('main.html')

# Handle messages from client
@socketio.on('yeetmessage')
def handle_message(message):
    return message

if __name__ == '__main__':
    socketio.run(app, debug=True, host= '0.0.0.0')