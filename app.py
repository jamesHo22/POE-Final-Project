# Tutorial from https://codeburst.io/building-your-first-chat-application-using-flask-in-7-minutes-f98de4adfa5d
from flask import Flask, render_template
from flask import request
from flask_socketio import SocketIO
import plotly.graph_objects as go

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

# fig = go.Figure(data=go.Bar(y=[2, 3, 1]))
# fig.write_html('first_figure.html', auto_open=True)

@app.route('/', methods=['GET', 'POST'])
def hello():
    return render_template('main.html')

# From tutorial
def messageReceived(methods=['GET', 'POST']):
    print('message was received!!!')

@socketio.on('my event')
def handle_my_custom_event(json, methods=['GET', 'POST']):
    print('received my event: ' + str(json))
    socketio.emit('my response', json, callback=messageReceived)

if __name__ == '__main__':
    socketio.run(app, debug=True)