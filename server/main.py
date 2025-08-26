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

@app.get('/')
def root():
    return 'welcome toc project'

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
    
    
    
@app.get("/download/team-info")
def download_team_info():
    try:
        filename = "team_info.csv"
        export_team_info_to_csv(filename)
        file_path = os.path.abspath(filename)

        if not os.path.exists(file_path):
            raise FileNotFoundError(f"File {filename} not found.")

        return FileResponse(
            path=file_path,
            filename=filename,
            media_type="text/csv"
        )
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})


