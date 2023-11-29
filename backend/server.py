from flask import Flask, request, abort, make_response
from settings import dbpwd
import mysql.connector as mysql
import json
# from flask_cors import CORS
import uuid
import bcrypt

pool = mysql.pooling.MySQLConnectionPool(
    host = "niv-db-instance.cbrdyb6rueag.eu-central-1.rds.amazonaws.com",
    user = "admin",
    # host = "localhost",
    # user = "root",
    passwd = dbpwd,
    database = "blog",
    buffered=True,
    pool_size=5,
    pool_name="niv_blog"
)

app = Flask(__name__,
            static_folder=r'C:\Users\nivca\OneDrive\שולחן העבודה\IDC Computer Science\שנה ג\סימסטר ב\סדנה בפיתוח Full-Stack\blog\build',
            static_url_path='/')

# print(pool)

# app = Flask(__name__)
# CORS(app)

# CORS(app,supports_credentials=True,origins=["http://localhost:3000", "http://127.0.0.1:5000"], expose_headers='Set-Cookie')


# noinspection PyInterpreter
@app.route('/')
@app.route('/about')
@app.route('/new')
@app.route('/login')
@app.route('/profile')
def index():
    return app.send_static_file('index.html')


@app.route('/post/<post_id>')
@app.route('/update_post/<post_id>')
def index2(post_id):
    return app.send_static_file('index.html')



@app.route('/users', methods=['GET', 'POST'])
def manage_users():
    if request.method == 'GET':
        return get_all_users()
    else:
        return add_user()
    
def get_all_users():
    db = pool.get_connection()
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
    db.close()
    return json.dumps(data)

def add_user():
    db = pool.get_connection()
    data = request.get_json()
    print(data)
    hashed_pwd = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
    query = "insert into users (name, username, password) values (%s, %s, %s)"
    values = (data['name'], data['username'], hashed_pwd.decode('utf-8'))
    cursor = db.cursor()
    cursor.execute(query, values)
    db.commit()
    new_user_id = cursor.lastrowid
    cursor.close()
    db.close()
    return get_user(new_user_id)

def get_user(id):
    db = pool.get_connection()
    query = "select id, name, username, password from users where id = %s"
    values = (id,)
    cursor = db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchone()
    cursor.close()
    header = ['id', 'name', 'username', 'password']
    db.close()
    return json.dumps(dict(zip(header, record)))
    
@app.route('/users/signup', methods=['POST'])
def signup():
    if request.method == 'POST':
        return add_user()
    
@app.route('/users/login', methods=['POST'])
def login():
    if request.method == 'POST':
        return do_login()
    
def do_login():
    db = pool.get_connection()
    data = request.get_json()
    print(data)
    query = "select id, name, username, password from users where username = %s"
    values = (data['username'],)
    cursor = db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchone()
    cursor.close()

    if not record:
        db.close()
        abort(401)

    user_id = record[0]
    hashed_pwd_db = record[3]

    if not bcrypt.checkpw(data['password'].encode('utf-8'), hashed_pwd_db.encode('utf-8')):
        db.close()
        abort(401)
    
    query = "insert into sessions (user_id, session_id) values (%s, %s)"
    session_id = str(uuid.uuid4())
    values = (record[0], session_id)
    cursor = db.cursor()
    cursor.execute(query, values)
    db.commit()
    cursor.close()
    resp = make_response()
    resp.set_cookie("session_id", session_id)
    db.close()
    return resp
    
@app.route('/posts', methods=['GET', 'POST'])
def manage_posts():
    if request.method == 'GET':
        return get_all_posts()
    else:
        return add_post()

def get_all_posts():
    db = pool.get_connection()
    query = "select id, title, body, user_id from posts"
    cursor = db.cursor()
    cursor.execute(query)
    records = cursor.fetchall()
    cursor.close()
    print(records)
    header = ['id', 'title', 'body', 'user_id']
    data = []
    for r in records:
        data.append(dict(zip(header, r)))
    db.close()
    return json.dumps(data)

def add_post():
    db = pool.get_connection()
    login_status = check_login()
    user_id = login_status["user_id"]
    data = request.get_json()
    print(data)
    query = "insert into posts (title, body, user_id) values (%s, %s, %s)"
    values = (data['title'], data['body'], user_id)
    cursor = db.cursor()
    cursor.execute(query, values)
    db.commit()
    new_post_id = cursor.lastrowid
    cursor.close()
    db.close()
    return get_post(new_post_id)

def get_post(id):
    db = pool.get_connection()
    query = "select id, title, body, user_id from posts where id = %s"
    values = (id,)
    cursor = db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchone()
    cursor.close()
    header = ['id', 'title', 'body', 'user_id']
    db.close()
    return json.dumps(dict(zip(header, record)))

def check_login():
    db = pool.get_connection()
    session_id = request.cookies.get("session_id")
    if not session_id:
        db.close()
        abort(401)
    query = "select user_id from sessions where session_id = %s"
    values = (session_id,)
    cursor = db.cursor()
    cursor.execute(query, values)
    record = cursor.fetchone()
    cursor.close()
    if not record:
        db.close()
        abort(401)
    db.close()
    return {"user_id": record[0]}

@app.route('/posts/<id>', methods=['PUT', 'DELETE', 'GET'])
def manage_post(id):
    if request.method == 'PUT':
        return update_post(id)
    elif request.method == 'DELETE':
        return delete_post(id)
    else:
        return get_post(id)
    
def update_post(id):
    db = pool.get_connection()
    data = request.get_json()
    print(data)
    query = "update posts set title = %s, body = %s where id = %s"
    values = (data['title'], data['body'], id)
    cursor = db.cursor()
    cursor.execute(query, values)
    cursor.close()
    db.commit()
    db.close()
    return get_post(id)

def delete_post(id):
    db = pool.get_connection()
    query = "delete from posts where id = %s"
    values = (id,)
    cursor = db.cursor()
    cursor.execute(query, values)
    cursor.close()
    db.commit()
    db.close()
    return get_all_posts()

@app.route('/display_profile', methods=['GET', 'DELETE'])
def manage_profile():
    if request.method == 'GET':
        return get_user_details()
    else:
        return user_logout()
    
def get_user_details():
    login_status = check_login()
    user_id = login_status["user_id"]
    return get_user(user_id)

def user_logout():
    db = pool.get_connection()
    session_id = request.cookies.get("session_id")
    if not session_id:
        db.close()
        abort(401)
    query = "delete from sessions where session_id = %s"
    values = (session_id,)
    cursor = db.cursor()
    cursor.execute(query, values)
    cursor.close()
    db.commit()
    resp = make_response()
    resp.set_cookie("session_id", "", expires=0)
    db.close()
    return resp

if __name__ == "__main__":
    app.run()