from app import *
from pydantic import BaseModel

class Login_Request(BaseModel):
    username: str
    password: str

app.login = {'status':False,'user':""}

@app.post("/login")
def log_in(login_request: Login_Request):

    if(app.login['status']==True):
        return {'Message':'Already Logged In','User':app.login['user']}

    username = login_request.username
    password = login_request.password
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
            app.login['status'] = True
            app.login['user'] = f"{username}"
            return {'Message': 'Logged In Successfully','User':app.login['user'],'login':app.login['status']}
        else:
            return {'Message':'Password Incorrect'}
        
@app.post("/logout")
def logout():
    if(app.login['status']==True):
        app.login['status'] = False
        app.login['user'] = ""
        return {"Message":"Logged Out"}
    return{"Message":"Not logged in"}


@app.post("/register")
def register(login_register: Login_Request):

    if(app.login['status']==True):
        return {'Message':'Already Logged In','User':app.login['user']}
    
    username = login_register.username
    password = login_register.password

    query1 = "SELECT COUNT(*) FROM accounts WHERE Username = %s"

    try:
        with connection.cursor() as cursor:
            cursor.execute(query1, (username,))
            count = cursor.fetchone()[0]
    except mysql.connector.Error as e:
        return {'error': 'Database error', 'details': str(e)}
    finally:
        cursor.close() 
    
    if(count>0):
        return{"Message":"Username already exists"}
    else:
        query2 = "INSERT INTO accounts (Username,Password) VALUES (%s,%s)"
        query3 = f"CREATE TABLE {username} (Task VARCHAR(50),Type VARCHAR(10))"
        try:
            with connection.cursor() as cursor:
                cursor.execute(query2,(username,password))
                cursor.execute(query3)
                connection.commit()
                return {'Message':'Account Created'}
        except mysql.connector.Error as e:
            return {'error': 'Database error', 'details': str(e)}
        finally:
            cursor.close()


@app.post("/delete")
def del_acc():

    if(app.login['status']==True):

        query1 = f"DELETE FROM accounts WHERE Username = %s"
        query2 = f"DROP TABLE {app.login['user']}"

        try:
            with connection.cursor() as cursor:
                cursor.execute(query1, (app.login['user'],))
                cursor.execute(query2)
        except mysql.connector.Error as e:
            return {'error': 'Database error', 'details': str(e)}
        finally:
            cursor.close() 
        app.login['status'] = False
        app.login['user']=""
        return{"Message":"Account has been deleted"};
    return{"Message":"Nobody logged in"}

    
    
    
    
    
    
    
    
    
    


