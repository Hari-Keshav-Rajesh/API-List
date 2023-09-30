from app import *
from login import *
from pydantic import BaseModel

class List_Elements(BaseModel):
    title:str
    id:str
    finish:bool

@app.post("/addList")
def add_list(list_ele:List_Elements):
    if(app.login['status']==True):
        query = f"INSERT INTO {app.login['user']} (title,id,finish) VALUES (%s,%s,%s)"
        try:
            with connection.cursor() as cursor:
                cursor.execute(query,(list_ele.title,list_ele.id,list_ele.finish))
                connection.commit()
                return {'Message':'Entry added'}
        except mysql.connector.Error as e:
            return {'Message': 'Database error', 'details': str(e)}
        finally:
            cursor.close()
    return{'Message':'Nobody logged in'}

@app.delete("/deleteList/{id}")
def delete_list(id: str):
    if(app.login['status']==True):
        query = f"DELETE FROM {app.login['user']} WHERE id = %s"
        try:
            with connection.cursor() as cursor:
                cursor.execute(query,(id,))
                connection.commit()
                return {'Message':'Entry deleted'}
        except mysql.connector.Error as e:
            return {'Message': 'Database error', 'details': str(e)}
        finally:
            cursor.close()
    return{'Message':'Nobody logged in'}

@app.delete("/deleteAllList")
def delete_all_list():
    if(app.login['status']==True):
        query = f"DELETE FROM {app.login['user']}"
        try:
            with connection.cursor() as cursor:
                cursor.execute(query)
                connection.commit()
                return {'Message':'All Entries deleted'}
        except mysql.connector.Error as e:
            return {'Message': 'Database error', 'details': str(e)}
        finally:
            cursor.close()
    return{'Message':'Nobody logged in'}

@app.post("/updateListStatus/{id}")
def update_list_status(id: str):
    if(app.login['status']==True):
        query = f"UPDATE {app.login['user']} SET finish = NOT finish WHERE id = %s"
        try:
            with connection.cursor() as cursor:
                cursor.execute(query,(id,))
                connection.commit()
                return {'Message':'Entry updated'}
        except mysql.connector.Error as e:
            return {'Message': 'Database error', 'details': str(e)}
        finally:
            cursor.close()
    return{'Message':'Nobody logged in'}

@app.get("/getList")
def get_list():
    if(app.login['status']==True):
        query = f"SELECT * FROM {app.login['user']}"
        try:
            with connection.cursor() as cursor:
                cursor.execute(query)
                result = cursor.fetchall()
                return {'Array':result}
        except mysql.connector.Error as e:
            return {'Message': 'Database error', 'details': str(e)}
        finally:
            cursor.close()
    return{'Message':'Nobody logged in'}