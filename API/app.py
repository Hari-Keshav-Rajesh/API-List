from fastapi import FastAPI,Header,HTTPException,Depends

app = FastAPI()

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

def extract_token(authorization: str = Header(None)):
    if authorization and authorization.startswith('Bearer '):
        token = authorization[len('Bearer '):]
        return token
    return None

@app.get("/protected")
async def protected_route(token: str = Depends(extract_token)):
    if token is None:
        raise HTTPException(status_code=401, detail="Unauthorized")
    # Your code to validate the token and process the request
    return {"message": "Authorized"}