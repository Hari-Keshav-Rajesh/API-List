from app import *
from login import *
from list import *
from fastapi.middleware.cors import CORSMiddleware



origins = ["http://localhost:5173"]   

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # You can specify HTTP methods here (e.g., ["GET", "POST"])
    allow_headers=["*"],  # You can specify allowed headers here
)


@app.get("/")
def read_root():
    return {"message": "Welcome to the API!"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app,host="0.0.0.0", port=8000)