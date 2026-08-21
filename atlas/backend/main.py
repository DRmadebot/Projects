from fastapi import FastAPI
from pydantic import BaseModel

class Note(BaseModel):
    title:str
    content:str

app = FastAPI()

@app.get("/api/health")
async def health():
    return {"status": "OK"}

@app.get("/api/notes")
async def notes():
    return {"notes":[]}

@app.post("/api/notes",status_code=201)
async def create_note(note:Note):
    returnedNote = {"title":note.title,"content":note.content}
    return returnedNote