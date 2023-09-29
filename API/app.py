from fastapi import FastAPI,UploadFile,Depends,Request
import logging


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