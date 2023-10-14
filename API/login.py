from app import *
from pydantic import BaseModel
import jwt
import uuid
from fastapi import HTTPException,Depends
from jwt import PyJWTError


class Login_Request(BaseModel):
    username: str
    password: str

class Password_Change(BaseModel):
    password: str
    new_password: str

def create_jwt(username,password):
    encoded_jwt = jwt.encode({"username": username,"password":password,"jti":str(uuid.uuid4())}, "SUPERSECUREPASSWORD", algorithm="HS256")
    return encoded_jwt

def decode_jwt(token):
    secret_key = "SUPERSECUREPASSWORD"
    decoded_jwt = jwt.decode(token, secret_key, algorithms=["HS256"])
    return decoded_jwt

def get_token_payload(token: str = Depends(extract_token)):
    try:
        secret_key = "SUPERSECUREPASSWORD"
        payload = jwt.decode(token, secret_key, algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

@app.post("/login")
def log_in(login_request: Login_Request):
   

    username = login_request.username
    password = login_request.password
    query1 = "SELECT COUNT(*) FROM accounts WHERE Username = %s"

    try:
        with connection.cursor() as cursor:
            cursor.execute(query1, (username,))
            count = cursor.fetchone()[0]
    except mysql.connector.Error as e:
        return {"Message": "Database error", "details": str(e)}
    finally:
        cursor.close()

    if count == 0:
        return {
            "Message": "Username Does not exist",
        }
    else:
        query2 = "SELECT Password FROM accounts WHERE Username = %s"
        try:
            with connection.cursor() as cursor:
                cursor.execute(query2, (username,))
                pass_word = cursor.fetchone()[0]
        except mysql.connector.Error as e:
            return {"error": "Database error", "details": str(e)}
        finally:
            cursor.close()

        if password == pass_word:
            token = create_jwt(username,password)
            return {
                "Message": "Logged In Successfully",
                "User": decode_jwt(token)["username"],
                "password": decode_jwt(token)["password"],
                "token": token,
                "login": True 
            }
        else:
            return {
                "Message": "Password Incorrect"#change the return to this when you use jwt
            }


@app.post("/logout")
def logout():
        return {"Message": "Logged Out"}


@app.post("/register")
def register(login_register: Login_Request):

    username = login_register.username
    password = login_register.password

    query1 = "SELECT COUNT(*) FROM accounts WHERE Username = %s"

    try:
        with connection.cursor() as cursor:
            cursor.execute(query1, (username,))
            count = cursor.fetchone()[0]
    except mysql.connector.Error as e:
        return {"Message": "Database error", "details": str(e)}
    finally:
        cursor.close()

    if count > 0:
        return {"Message": "Username already exists"}
    else:
        query2 = "INSERT INTO accounts (Username,Password) VALUES (%s,%s)"
        query3 = f"CREATE TABLE {username} (title VARCHAR(255), id CHAR(36) PRIMARY KEY, finish BOOLEAN)"

        try:
            with connection.cursor() as cursor:
                cursor.execute(query2, (username, password))
                cursor.execute(query3)
                connection.commit()
                return {"Message": "Account Created"}
        except mysql.connector.Error as e:
            return {"Message": "Database error", "details": str(e)}
        finally:
            cursor.close()


@app.post("/delete")
def del_acc(token: str = Depends(extract_token)):
        payload = get_token_payload(token)
        query1 = f"DELETE FROM accounts WHERE Username = %s"
        query2 = f"DROP TABLE {payload['username']}"

        try:
            with connection.cursor() as cursor:
                cursor.execute(query1, (payload["username"],))
                cursor.execute(query2)
        except mysql.connector.Error as e:
            return {"error": "Database error", "details": str(e)}
        finally:
            cursor.close()
        return {"Message": "Account has been deleted"}


@app.get("/status")
def status_login(token: str = Depends(extract_token)):
    if token:
        payload  = get_token_payload(token)
        return {
            "User": payload["username"],
            "password": payload["password"],
            "login":True
        }
    else:
        return{
            "login":False,
            "User": "",
            "password": ""
        }

@app.patch("/change_username")
def user_change(login_userChange: Login_Request,token: str = Depends(extract_token)):
        
        payload = get_token_payload(token)
        new_user = login_userChange.username
        password = login_userChange.password
        username = new_user
        query = "SELECT COUNT(*) FROM accounts WHERE Username = %s"

        try:
            with connection.cursor() as cursor:
                cursor.execute(query, (username,))
                count = cursor.fetchone()[0]
        except mysql.connector.Error as e:
            return {"Message": "Database error", "details": str(e)}
        finally:
            cursor.close()
        
        if count > 0:
            return {"Message": "Username already exists"}
        else:
            if(password == payload["password"]):
                query1 = f"UPDATE accounts SET Username = %s WHERE Username = %s"
                query2 = f"ALTER TABLE {payload['username']} RENAME TO {new_user}"
                try:
                    with connection.cursor() as cursor:
                        cursor.execute(query1, (new_user, payload["username"]))
                        cursor.execute(query2)
                        connection.commit()
                        payload["username"] = new_user
                        token = create_jwt(new_user,password)
                        return {"Message": "Username has been changed","identifier": token}
                except mysql.connector.Error as e:
                    return {"error": "Database error", "details": str(e)}
                finally:
                    cursor.close()
            return {"Message": "Password Incorrect"}
        


@app.patch("/change_password")
def password_change(password_change: Password_Change,token: str = Depends(extract_token)):
        payload = get_token_payload(token)
        old_password = password_change.password
        new = password_change.new_password
        if(old_password == payload["password"]): 
            query1 = f"UPDATE accounts SET Password = %s WHERE Username = %s"
            try:
                with connection.cursor() as cursor:
                    cursor.execute(query1, (new, payload["username"]))
                    connection.commit()
                    payload["password"] = new
                    token = create_jwt(payload["username"],new)
                    return {"Message": "Password has been changed","identifier": token}
            except mysql.connector.Error as e:
                return {"error": "Database error", "details": str(e)}
            finally:
                cursor.close()
        return {"Message": "Password Incorrect"}
