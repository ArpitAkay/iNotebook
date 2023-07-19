import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {

    const { note, updateNote } = props;

    const value = useContext(NoteContext);

    const handleDelete = (id) => {
        let sure = window.confirm("Are you sure?");
        if (sure) {
            value.deleteNote(id);
        }
    }

    return (
        <div className="col-md-3 my-2">
            <div className="card">
                <div className="card-body">
                    <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-primary">{note.tag}</span>
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-solid fa-trash" onClick={() => handleDelete(note._id)}></i>
                    <i className="fa-solid fa-pen-to-square mx-3" onClick={() => updateNote(note)}></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem;