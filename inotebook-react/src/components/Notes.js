import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteItem from './NoteItem'
import NoteContext from '../context/notes/NoteContext'
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';

const Notes = () => {

    const noteValue = useContext(NoteContext);

    const navigate = useNavigate();

    const authValue = useContext(AuthContext);

    useEffect(() => {
        if(authValue.auth.isAuthenticated) {
            noteValue.fetchallnotes();
        }
        else { 
            navigate("/login");
        }
        // eslint-disable-next-line
    }, []);

    const [eNote, setEnote] = useState({
        eId: "",
        eTitle: "",
        eDescription: "",
        eTag: "",
    })

    const ref = useRef(null);

    const updateNote = (note) => {
        setEnote({
            eId: note._id,
            eTitle: note.title,
            eDescription: note.description,
            eTag: note.tag
        })
        ref.current.click();
    }

    const onChange = (e) => {
        setEnote({ ...eNote, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        noteValue.editNote(eNote.eId, eNote.eTitle, eNote.eDescription, eNote.eTag);
    }

    return (
        <>
            <AddNote />
            <button ref={ref} type="button" className="btn btn-primary invisible" data-bs-toggle="modal" data-bs-target="#exampleModal">
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-2">
                                <div className="mb-3">
                                    <label htmlFor="eTitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="eTitle" name="eTitle" aria-describedby="emailHelp" onChange={onChange} value={eNote.eTitle} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="eDescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="eDescription" name="eDescription" onChange={onChange} value={eNote.eDescription} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="eTag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="eTag" name="eTag" onChange={onChange} value={eNote.eTag} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={eNote.eTitle.length < 3 || eNote.eDescription.length < 3 || eNote.eTag.length < 3} type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-2">
                <h2 className="text-center">Your notes</h2>
                <div className="container text-center">
                    {noteValue.notes.length === 0 && "No notes to display"}
                </div>
                {noteValue.notes.map((note) => {
                    return <NoteItem key={note._id} note={note} updateNote={updateNote} />
                })
                }
            </div>
        </>
    )
}

export default Notes