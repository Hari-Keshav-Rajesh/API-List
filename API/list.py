from app import *
from login import *
from pydantic import BaseModel


class List_Elements(BaseModel):
    title: str
    id: str
    finish: bool


@app.post("/addList")
def add_list(list_ele: List_Elements,token: str = Depends(extract_token)):
        payload = get_token_payload(token)
        query = f"INSERT INTO {payload['username']} (title,id,finish) VALUES (%s,%s,%s)"
        try:
            with connection.cursor() as cursor:
                cursor.execute(query, (list_ele.title, list_ele.id, list_ele.finish))
                connection.commit()
                return {"Message": "Entry added"}
        except mysql.connector.Error as e:
            return {"Message": "Database error", "details": str(e)}
        finally:
            cursor.close()


@app.delete("/deleteList/{id}")
def delete_list(id: str,token: str = Depends(extract_token)):
        payload = get_token_payload(token)
        query = f"DELETE FROM {payload['username']} WHERE id = %s"
        try:
            with connection.cursor() as cursor:
                cursor.execute(query, (id,))
                connection.commit()
                return {"Message": "Entry deleted"}
        except mysql.connector.Error as e:
            return {"Message": "Database error", "details": str(e)}
        finally:
            cursor.close()
 

@app.delete("/deleteAllList")
def delete_all_list(token: str = Depends(extract_token)):
        payload = get_token_payload(token)
        query = f"DELETE FROM {payload['username']}"
        try:
            with connection.cursor() as cursor:
                cursor.execute(query)
                connection.commit()
                return {"Message": "All Entries deleted"}
        except mysql.connector.Error as e:
            return {"Message": "Database error", "details": str(e)}
        finally:
            cursor.close()



@app.post("/updateListStatus/{id}")
def update_list_status(id: str,token: str = Depends(extract_token)):
        payload = get_token_payload(token)
        query = f"UPDATE {payload['username']} SET finish = NOT finish WHERE id = %s"
        try:
            with connection.cursor() as cursor:
                cursor.execute(query, (id,))
                connection.commit()
                return {"Message": "Entry updated"}
        except mysql.connector.Error as e:
            return {"Message": "Database error", "details": str(e)}
        finally:
            cursor.close()
    


@app.get("/getList")
def get_list(token: str = Depends(extract_token)):
        payload = get_token_payload(token)
        query = f"SELECT * FROM {payload['username']}"
        try:
            with connection.cursor() as cursor:
                cursor.execute(query)
                result = cursor.fetchall()
                return {"Array": result}
        except mysql.connector.Error as e:
            return {"Message": "Database error", "details": str(e)}
        finally:
            cursor.close()
    
