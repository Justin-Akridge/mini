const Note = ({ note, toggle_importance }) => {
  const label = note.important ? 'make important' : 'make not important'
    return (
      <li>
        {note.content}
        <button onClick={toggle_importance}>{label}</button>
      </li>
    )
}

export default Note
