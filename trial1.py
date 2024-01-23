from flask import Flask, render_template
from flask_socketio import SocketIO
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app)

alerts_data = [{'pulleyID': 'DV1', 'prediction': 'alert'}]

@app.route('/')
def index():
    return render_template('index_ws.html')

@socketio.on('connect')
def handle_connect():
    print('Client connected')
    send_alerts()

def send_alerts():
    for data in alerts_data:
        socketio.emit('alert', data)
        socketio.sleep(2)  # Simulating a delay, adjust as needed

if __name__ == '__main__':
    socketio.run(app, debug=True)
