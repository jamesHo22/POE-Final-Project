# Tutorial from https://flask-socketio.readthedocs.io/en/latest/
from flask import Flask, render_template
from flask_socketio import SocketIO

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)
count = 0
messageVar = 'no message'
data = messageVar, count

@app.route('/')
def hello():
    return render_template('main.html', result = data)

# Handle messages from client
@socketio.on('clientToServ')
def handle_message(message):
    print(f"YEET: {message}")
    global count
    global data
    count += 1
    data = message, count
    socketio.emit('clientToServ', f'{data}')
    print(data)

# From tutorial
def messageReceived(methods=['GET', 'POST']):
    print('message was received!!!')

@socketio.on('my event')
def handle_my_custom_event(json, methods=['GET', 'POST']):
    print('received my event: ' + str(json))
    socketio.emit('my response', json, callback=messageReceived)
    
def incrementCounter(mCount):
    count = mCount + 1

if __name__ == '__main__':
    socketio.run(app, debug=True)