import os
import sqlite3
from flask import Flask, request, session, g, redirect, url_for, abort, \
	render_template, flash


app = Flask(__name__)
app.config.from_object(_name_)


app.config.update(dict(
	DATABASE=os.path.join(app.root_path, 'emissions.db'),
	SECRET_KEY='development key',
	USERNAME='admin',
	PASSWORD='default'
))


app.config.from_envvar('EMISSIONS_SETTINGS', silent=True) #Read into this later on, silent so shouldn't present complaints

# connection object
def connect_db():
	return sqlite3.connect(app.config['DATABASE'])
	




@app.route('/')
def index():
    return 'Hello!'

if __name__ == '__main__':
    app.run()
