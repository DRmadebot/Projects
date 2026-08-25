import sqlite3
from database import init_db,create_note,get_note
from datetime import datetime



def test_db_init():
    con = sqlite3.connect(":memory:")
    init_db(con)
    cur = con.cursor()
    cur.execute("""
        SELECT name
        FROM sqlite_master
        WHERE type = 'table' AND name = 'notes'
    """)
    result = cur.fetchone()
    assert result is not None

def test_note_creation():
    con = sqlite3.connect(":memory:")
    init_db(con)

    create_note(
        con,
        user_id=1,
        title="Learn FastAPI",
        content="Understand database connections",
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    cur=con.cursor()

    cur.execute("""
        SELECT user_id, title, content, created_at, updated_at
        FROM notes
    """)

    result = cur.fetchone()

    assert result is not None
    assert result[0] == 1
    assert result[1] == "Learn FastAPI"
    assert result[2] == "Understand database connections"
    assert result[3] is not None
    assert result[4] is not None

def test_note_retrieval():
    con = sqlite3.connect(":memory:")
    init_db(con)
    note_id = create_note(
        con,
        1,
        "Learn FastAPI",
        "Understand SQLite",
        "2026-08-21",
        "2026-08-21"
    )

    note = get_note(con, 1, note_id)

    assert note is not None
    assert note[0] == note_id
    assert note[1] == 1
    assert note[2] == "Learn FastAPI"
    assert note[3] == "Understand SQLite"

