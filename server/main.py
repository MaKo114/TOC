from fastapi import FastAPI, Query
from mockup import *

app = FastAPI()

@app.get("/teams")
def fetch_all_data():
    data =  get_europe_team_info()
    return data


@app.get('/team/players/{team}')
def fetch_players(team : str):
    players = get_team_players(team)
    return players

