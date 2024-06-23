import os
import random
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS
import pysam
from io import BytesIO

app = Flask(__name__)
CORS(app)

@app.route('/continue_conversation', methods=['POST'])
def continue_conversation():
    print(request.form.get('text'))

    return jsonify({"message": "continue_conversation"})


@app.route('/upload', methods=['POST'])
def hello_world():

    print(request.files['bloodwork'])
    print(request.form.get('message'))
    
    return jsonify({"message": "response_message"})

if __name__ == '__main__':
    app.run(debug=True)