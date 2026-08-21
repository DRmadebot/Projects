from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_notes():
    response=client.get("/api/notes")
    assert response.status_code==200
    assert response.json()=={"notes":[]}

def test_create_note():
    response=client.post("/api/notes",
        json={
            "title":"New beginnings!",
            "content":"Hello World"
        }
    )
    assert response.status_code==201
    assert response.json()=={
        "title":"New beginnings!",
        "content":"Hello World"
    }