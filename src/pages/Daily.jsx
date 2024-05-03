import { useState } from 'react';
import CreateNote from '../components/create-note.jsx';

function Daily() {
    const [notes, setNotes] = useState([]);
    const [editedNoteId, setEditedNoteId] = useState(null);
    const [editedNoteContent, setEditedNoteContent] = useState('');

    const addNote = (content) => {
        const newNote = {
            id: notes.length + 1,
            content: content
        };
        setNotes([...notes, newNote]);
    };

    const editNote = (id, content) => {
        setEditedNoteId(id);
        setEditedNoteContent(content);
    };

    const saveEditedNote = () => {
        const updatedNotes = notes.map(note => {
            if (note.id === editedNoteId) {
                return { ...note, content: editedNoteContent };
            }
            return note;
        });
        setNotes(updatedNotes);
        setEditedNoteId(null);
        setEditedNoteContent('');
    };

    const deleteNote = (id) => {
        const updatedNotes = notes.filter(note => note.id !== id);
        setNotes(updatedNotes);
    };

    return (
        <div style={{ margin: "15px 15px 50px" }}>
            <CreateNote addNote={addNote} />

            {notes.length === 0 ? (
                <p>No notes available. Create a new note to get started!</p>
            ) : (
                <>
                    <h6>05.04.2024</h6>
                    <ul className="list-group">
                        {notes.map(note => (
                            <li className="list-group-item d-flex justify-content-between align-items-center" key={note.id}>
                                {editedNoteId === note.id ? (
                                    <textarea
                                        value={editedNoteContent}
                                        onChange={(e) => setEditedNoteContent(e.target.value)}
                                        onBlur={saveEditedNote}
                                        className='default-textarea'
                                    />
                                ) : (
                                    <span>{note.content}</span>
                                )}
                                <div>
                                    {editedNoteId === note.id ? (
                                        <button className="btn btn-success btn-sm" onClick={saveEditedNote} style={{marginLeft: 10}}><i className='icon-pencil'></i></button>
                                    ) : (
                                        <div style={{display: 'flex'}}>
                                            <button className="btn btn-info btn-sm" onClick={() => editNote(note.id, note.content)}><i className='icon-pencil'></i></button>
                                            <button className="btn btn-danger btn-sm" onClick={() => deleteNote(note.id)} style={{marginLeft: 10}}><i className='icon-trash'></i></button>
                                        </div>
                                        
                                    )}
                                    
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}

export default Daily;
