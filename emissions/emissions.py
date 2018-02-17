import os
import sqlite3, csv, json
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
    cur = db.cursor()
    with app.open_resource('schema.sql', mode='r') as f:
        cur.executescript(f.read())
    with open('./data/data.csv', 'r') as f:
        dr = csv.DictReader(f)
        to_db = [(i['subregion'], i['rate'], i['lineloss']) for i in dr]
    cur.executemany('INSERT INTO data (subregion, rate, lineloss) VALUES (?,?,?);', to_db)
    with open('./data/Zipcode_to_subregion.csv', 'r') as f:
        dr = csv.DictReader(f)
        to_db = [(i['zip'], i['subregion']) for i in dr]
    cur.executemany('INSERT INTO zipper (zip, subregion) VALUES (?,?);', to_db)
    db.commit()

@app.cli.command('initdb')
def initdb_command():
    init_db()
    print('Initialized the database.')

def get_db():
    if not hasattr(g, 'sqlite_db'):
        g.sqlite_db = connect_db()
    return g.sqlite_db

@app.cli.command('testquery')
def testquery_command(*args,**kwargs):
    db = get_db()
    cur = db.cursor()
    cur.execute('SELECT * FROM zipper;')
    print(cur.fetchone())


@app.teardown_appcontext
def close_db(error):
    if hasattr(g, 'sqlite_db'):
        g.sqlite_db.close()

@app.route('/calculate', methods=['GET'])
def calculate():
    pass



@app.route('/')
def index():
    return render_template("index.html")

if __name__ == '__main__':
    app.run()
