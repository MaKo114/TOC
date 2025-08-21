from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from mockup import *


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/teams")
def fetch_all_data():
    data =  get_europe_team_info()
    return data


@app.get('/team/players/{team}')
def fetch_players(team : str):
    players = get_team_players(team)
    return players

