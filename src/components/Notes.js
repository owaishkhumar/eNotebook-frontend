import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = (props) => {
    let navigate = useNavigate();

    const context = useContext(noteContext);

    const { notes, getNotes, editNote } = context;

    const {showAlert} = props;

    const [note, setNote] = useState({ _id: "", etitle: "", edescription: "", etag: "" });
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
            navigate('/');
        }
        else{
            navigate('/login')
        }
        // eslint-disable-next-line
    }, [])

    const updateNote = (currentNote) => {
        ref.current.click();
        // console.log(currentNote);
        setNote({ _id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
        
    }

    const handleClick = (e) => {
        e.preventDefault();
        ref2.current.click();
        editNote(note._id, note.etitle, note.edescription, note.etag);
        showAlert("Updated Successfully!", "success");
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const ref = useRef("")
    const ref2 = useRef("")

    return (
        <>
            <AddNote showAlert={showAlert} />
            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" ref={ref2} data-bs-dismiss="modal">Close</button>
                                    <button disabled={note.etitle.length < 5 || note.edescription.length < 5 } type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
            <div className="row container">
                <h2>Your notes</h2>
                {notes.length === 0 ? <div className='container'>No Notes</div> : notes.map((note) => {
                    return <NoteItem key={note._id} showAlert={showAlert} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes