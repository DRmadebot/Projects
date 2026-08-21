import sqlite3

def init_db():
    con = sqlite3.connect("atlas.db")

    cur = con.cursor()

    cur.execute("""CREATE TABLE IF NOT EXISTS notes(id INTEGER PRIMARY KEY,user_id INTEGER NOT NULL,title TEXT NOT NULL,content TEXT NOT NULL,created_at DATETIME NOT NULL,updated_at DATETIME NOT NULL)""")

    con.commit()