import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'


type Note = {
  id: number
  title: string
  content: string
}

function App() {
  const [notes, setNotes] = useState<Note[]>([])
  useEffect(()=>{
    const fetchNotes = async ()=>{
      const res = await axios.get("http://localhost:8000/api/notes")
      console.log(res.data)
      setNotes(res.data.notes)
    }
    
    fetchNotes()
  },[])
  return (
    <div>
      <h1>Atlas</h1>
      <h2>Notes</h2>
      {notes.map(note=>(
        <div>{note.id} {note.title} {note.content}</div>
      ))}
    </div>
  )
}

export default App
