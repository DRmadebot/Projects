from fastapi import FastAPI,Depends
from pydantic import BaseModel
import sqlite3
from datetime import datetime
from database import init_db,get_note
from database import create_note as db_create_note
from database import get_notes as db_get_notes

class Note(BaseModel):
    title:str
    content:str

app = FastAPI()

con = sqlite3.connect("./atlas.db")
init_db(con)
con.close()

def get_db():
    c = sqlite3.connect("./atlas.db", check_same_thread=False)
    return c

@app.get("/api/health")
async def health():
    return {"status": "OK"}

@app.get("/api/notes")
async def notes(con=Depends(get_db)):
    rows = db_get_notes(con,1)
    notes = [
        {
            "id": row[0],
            "title": row[2],
            "content": row[3]
        }
        for row in rows
    ]
    return {"notes":notes}

@app.post("/api/notes",status_code=201)
async def create_note(note:Note,con = Depends(get_db)):
    note_id = db_create_note(
        con,
        1,
        note.title,
        note.content,
        datetime.now(),
        datetime.now()
    )
    return {
        "id": note_id,
        "title": note.title,
        "content": note.content
    }