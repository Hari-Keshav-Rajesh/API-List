from app import *
from login import *


@app.get("/")
def read_root():
    return {"message": "Welcome to the API!"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app,host="0.0.0.0", port=8000)