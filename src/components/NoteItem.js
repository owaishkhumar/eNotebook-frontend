import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote, showAlert } = props;
    return (
        <>
            <div className="col-md-3">
                <div className="card my-3">
                    <div className="card-body">
                        <div className="d-flex align-items-center">
                            <h5 className="card-title">{note.title}</h5>
                            <i className="fa-solid fa-pen-to-square mx-2" onClick={()=> updateNote(note)} ></i>
                            <i className="fa-solid fa-trash mx-2" onClick={() => {deleteNote(note._id); showAlert("Deleted Successfully!", "success") }}></i>
                        </div>
                        <p className="card-text">{note.description}</p>
                        <p className="card-text">Tags: {note.tag}</p>
                        {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteItem