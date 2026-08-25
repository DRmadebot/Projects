import sqlite3

con = sqlite3.connect("atlas.db")

def init_db(con):
    cur = con.cursor()

    cur.execute("""CREATE TABLE IF NOT EXISTS notes(id INTEGER PRIMARY KEY,user_id INTEGER NOT NULL,title TEXT NOT NULL,content TEXT NOT NULL,created_at DATETIME NOT NULL,updated_at DATETIME NOT NULL)""")

    con.commit()

def create_note(con, user_id, title, content,created_at,updated_at):
    cur = con.cursor()
    cur.execute("""
        INSERT INTO notes(user_id,title, content, created_at,updated_at) VALUES (?,?,?,?,?)
    """,(user_id,title,content,created_at,updated_at))
    con.commit()
    return cur.lastrowid

def get_note(con, user_id, note_id):
    cur=con.cursor()
    cur.execute("""
        SELECT * FROM notes WHERE user_id=? AND id=?
    """,(user_id,note_id))
    return cur.fetchone()

def get_notes(con,user_id):
    cur=con.cursor()
    cur.execute("""
        SELECT * FROM notes WHERE user_id=?
    """,(user_id,))
    return cur.fetchall()