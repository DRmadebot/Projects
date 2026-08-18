from fastapi import FastAPI

app = FastAPI()

@app.get("/api/health")
async def health():
    return {"status": "OK"}

@app.get("/api/notes")
async def notes():
    return {"notes":[]}