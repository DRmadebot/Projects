from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_notes():
    response=client.get("/api/notes")
    assert response.status_code==200
    assert response.json()=={"notes":[]}