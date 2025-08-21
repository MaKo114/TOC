from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
import os
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
    try:
        data = get_europe_team_info()
        return data
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

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



@app.get("/csv", response_class=FileResponse)
def download_csv():
    filename = "full_team_data.csv"

    try:
        # สร้างไฟล์ CSV
        export_team_names_to_csv(filename=filename)

        # ตรวจสอบว่าไฟล์ถูกสร้างจริง
        if not os.path.exists(filename):
            raise FileNotFoundError(f"ไม่พบไฟล์: {filename}")

        # ส่งไฟล์กลับ
        return FileResponse(
            path=filename,
            filename=filename,
            media_type="text/csv"
        )

    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"error": f"เกิดข้อผิดพลาด: {str(e)}"}
        )
