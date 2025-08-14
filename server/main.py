from fastapi import FastAPI
from mockup import *

app = FastAPI()


@app.get("/")
def get_data():
    data = all_data()
    return data


@app.get("/user/{name}")  
def get_user_by_id(name: str):
    team = get_data_by_name(name)
    print(team)
    return {'link':team}