import { useEffect, useState } from "react";
import Note from "./components/Note";
import axios from 'axios'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('Type a note here')
  const [showAll, setShowAll] = useState(true)
  useEffect(() => {
    axios
      .get("http://localhost:3001/notes")
      .then(res => {
        setNotes(res.data)
      })
  }, [])

  const addNote = (e) => {
    e.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }
    axios
      .post("http://localhost:3001/notes", noteObject)
      .then(res => {
        setNotes(notes.concat(res.data))
      })
    setNewNote("")
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}
    axios.put(url, changedNote).then(res => {
      setNotes(notes.map(n => n.id !== id ? n : res.data))
    })
  }

  const handleNoteChange = (e) => {
    console.log(e.target.value)
    setNewNote(e.target.value)
  }

  const handleUserClickOnInput = () => {
    setNewNote("")
  }

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => setShowAll(!showAll)}>show {showAll ? 'show important' : 'show all'}</button>
      <ul>
        {notesToShow.map(note => 
          <Note 
            key={note.id} 
            note={note.content} 
            toggle_importance={() => toggleImportanceOf(note.id)}
        />)}
      </ul>
      <form onSubmit={addNote}>
        <input 
          id="note-input" 
          value={newNote} 
          onClick={handleUserClickOnInput} 
          onChange={handleNoteChange} 
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}


export default App