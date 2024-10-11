import configparser
import os
from flask import Flask, jsonify

from routes.user import user_bp

app = Flask(__name__)

app.register_blueprint(user_bp)


config = configparser.ConfigParser()
config.read(os.path.abspath(os.path.join(".ini")))
print(os.path.abspath(os.path.join(".ini")), config['LOCAL']['DB_URI'])


@app.route("/")
def hello_world():
    # data = {'data' : "hello"}
    # print('helloooo', data)

    # res.json() -- fe
    # return jsonify(data)

    # res.text() -- fe
    return "hello"


if __name__ == '__main__':
    print(f"config: ", config)
    app.config['DEBUG'] = True
    app.config['MONGO_URI'] = config['LOCAL']['DB_URI']
    app.run()