from flask import Flask, request
from settings import dbpwd
import mysql.connector as mysql
import json
from flask_cors import CORS

db = mysql.connect(
    host = "localhost",
    user = "root",
    passwd = dbpwd,
    database = "blog")

print(db)

app = Flask(__name__)
CORS(app)

@app.route('/users', methods=['GET', 'POST'])
def manage_users():
    if request.method == 'GET':
        return get_all_users()
    else:
        return add_user()

def get_all_users():
    query = "select id, name, username, password from users"
    cursor = db.cursor()
    cursor.execute(query)
    records = cursor.fetchall()
    cursor.close()
    print(records)
    header = ['id', 'name', 'username', 'password']
    data = []
    for r in records:
        data.append(dict(zip(header, r)))
    return json.dumps(data)

def get_user(id):
    query = "select id, name, username, password from users where id = %s"
    values = (id,)
    cursor = db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchone()
    cursor.close()
    header = ['id', 'name', 'username', 'password']
    return json.dumps(dict(zip(header, record)))

def add_user():
    data = request.get_json()
    print(data)
    query = "insert into users (name, username, password) values (%s, %s, %s)"
    values = (data['name'], data['username'], data['password'])
    cursor = db.cursor()
    cursor.execute(query, values)
    db.commit()
    new_user_id = cursor.lastrowid
    cursor.close()
    return get_user(new_user_id)

@app.route('/posts', methods=['GET', 'POST'])
def manage_posts():
    if request.method == 'GET':
        return get_all_posts()
    else:
        return add_post()

def get_all_posts():
    query = "select id, title, body, user_id, image from posts"
    cursor = db.cursor()
    cursor.execute(query)
    records = cursor.fetchall()
    cursor.close()
    print(records)
    header = ['id', 'title', 'body', 'user_id', 'image']
    data = []
    for r in records:
        data.append(dict(zip(header, r)))
    return json.dumps(data)

def get_post(id):
    query = "select id, title, body, user_id, image from posts where id = %s"
    values = (id,)
    cursor = db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchone()
    cursor.close()
    header = ['id', 'title', 'body', 'user_id', 'image']
    return json.dumps(dict(zip(header, record)))

def add_post():
    data = request.get_json()
    print(data)
    query = "insert into posts (title, body, user_id, image) values (%s, %s, %s, %s)"
    values = (data['title'], data['body'], data['user_id'], data['image'])
    cursor = db.cursor()
    cursor.execute(query, values)
    db.commit()
    new_post_id = cursor.lastrowid
    cursor.close()
    return get_post(new_post_id)

if __name__ == "__main__":
    app.run()