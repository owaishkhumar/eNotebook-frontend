import { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) => {
    const host = "http://localhost:5000"

    const [notes, setNotes] = useState([]);


    // Get all notes
    const getNotes = async () => {
        try {
            const response = await fetch(`${host}/api/v1/notes/fetchallnotes`, {
                method: "GET", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
            });
            const json = await response.json();
            // console.log(json)
            setNotes(json);
        } catch (error) {
            console.log(error);
        }
    }

    // Add a note
    const addNote = async (title, description, tag) => {
        try {
            if (tag === "") {
                tag = undefined;
            }
            const response = await fetch(`${host}/api/v1/notes/addnote`, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
            });
            const json = await response.json();
            // console.log(json)
    
            setNotes(notes.concat(json));
        } catch (error) {
            console.log(error);
        }
    }

    // Delete a note
    const deleteNote = async (id) => {
        try {
            const response = await fetch(`${host}/api/v1/notes/deletenote/${id}`, {
                method: "DELETE", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
            });
            const json = await response.json();
            console.log(json)
    
            const newNotes = notes.filter((note) => { return note._id !== id })
            setNotes(newNotes);
        } catch (error) {
            console.log(error);
        }
    }

    // Edit a note
    const editNote = async (id, title, description, tag) => {
        try {
            const response = await fetch(`${host}/api/v1/notes/updatenote/${id}`, {
                method: "PUT", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
            });
            const json = await response.json();
            console.log(json);
    
            let newNotes = JSON.parse(JSON.stringify(notes));
            newNotes.forEach(element => {
                if (element._id === id) {
                    element.title = title;
                    element.description = description;
                    element.tag = tag;
                    return;
                }
            });
    
            setNotes(newNotes);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;