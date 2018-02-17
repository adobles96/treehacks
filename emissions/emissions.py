import os
import sqlite3, csv
from flask import Flask, request, session, g, redirect, url_for, abort, \
	render_template, flash


app = Flask(__name__, static_folder="./static/dist", template_folder="./static")
app.config.from_object(__name__)


app.config.update(dict(
	DATABASE=os.path.join(app.root_path, 'emissions.db'),
	SECRET_KEY='development key',
	USERNAME='admin',
	PASSWORD='default'
))


app.config.from_envvar('EMISSIONS_SETTINGS', silent=True) #Read into this later on, silent so shouldn't present complaints

# connection object
# Code borrowed from http://flask.pocoo.org/docs/0.12/tutorial/
def connect_db():
	return sqlite3.connect(app.config['DATABASE'])

def init_db():
    db = get_db()
    with app.open_resource('schema.sql', mode='r') as f:
        db.cursor().executescript(f.read())
    # with open('data/data.csv', 'r') as f:
    #     dr = csv.DictReader()
    db.commit()

@app.cli.command('initdb')
def initdb_command():
    init_db()
    print('Initialized the database.')

def get_db():
    if not hasattr(g, 'sqlite_db'):
        g.sqlite_db = connect_db()
    return g.sqlite_db

@app.teardown_appcontext
def close_db(error):
    if hasattr(g, 'sqlite_db'):
        g.sqlite_db.close()

@app.route('/')
def index():
    return render_template("index.html")

if __name__ == '__main__':
    app.run()
