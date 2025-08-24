from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
import os
from controller import *


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/teams")
def fetch_all_data(query: str = None):
    try:
        data = get_europe_team_info()
        if query:
            team = [ e for e in data if query.lower() in e['name'].lower()]
            return team
        return data
    except Exception as err:
        return JSONResponse(status_code=500, content={"error": str(err)})

@app.get('/team/players/{team}')
def fetch_players(team: str):
    try:
        players = get_team_players(team)
        return players
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})


@app.get('/team/player-info/')
def player_info(team: str, name: str):
    try:
        detail = player_detail(team, name)
        matches = extract_match_cards(team, name)
        recent_team = extract_all_team_info(team, name)
        return {
            "detail": detail,
            "matches": matches,
            "recent_team": recent_team
        }
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
    
    
    
@app.get("/download/team-names")
def download_team_names():
    try:
        filename = "team_names.csv"
        export_team_names_to_csv(filename)
        file_path = os.path.abspath(filename)
        return FileResponse(
            path=file_path,
            filename=filename,
            media_type="text/csv"
        )
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

