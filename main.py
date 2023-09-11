from fastapi import FastAPI

from pydantic import BaseModel

import mysql.connector
from mysql.connector import Error

from private import *

try:
    connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password=password_my_sql,
        database="API_LIST"
    )

    if connection.is_connected():
        print("Connected to MySQL database")
except Error as e:
    print(f"Error: {e}")


app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Welcome to the API!"}

class Login_Request(BaseModel):
    username: str
    password: str

login = False

def isLogin():
    if login==True:
        return True

@app.post("/login")
def login(login_request: Login_Request):
    username = login_request.username
    password = login_request.username
    query1 = "SELECT COUNT(*) FROM accounts WHERE Username = %s"

    try:
        with connection.cursor() as cursor:
            cursor.execute(query1, (username,))
            count = cursor.fetchone()[0]
    except mysql.connector.Error as e:
        return {'error': 'Database error', 'details': str(e)}
    finally:
        cursor.close() 
    
    if count == 0:
        return{'Username':'Does not exist'}
    else:
        query2 = "SELECT Password FROM accounts WHERE Username = %s"
        try:
            with connection.cursor() as cursor:
                cursor.execute(query2, (username,))
                pass_word = cursor.fetchone()[0]
        except mysql.connector.Error as e:
            return {'error': 'Database error', 'details': str(e)}
        finally:
            cursor.close()
        
        if(password == pass_word):
            login = True
            return {'Message': 'Logged In Successfully'}
        else:
            return {'Message':'Password Incorrect'}

@app.post("/register")
def register(login_register: Login_Request):
    username = login_register.username
    password = login_register.password

    query1 = "INSERT INTO accounts (Username,Password) VALUES (%s,%s)"
    
    try:
        with connection.cursor() as cursor:
            cursor.execute(query1,(username,password))
            connection.commit()
            return {'Message':'Account Created'}
    except mysql.connector.Error as e:
        return {'error': 'Database error', 'details': str(e)}
    finally:
        cursor.close()

