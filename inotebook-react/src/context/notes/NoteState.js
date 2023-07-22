import { useContext, useState } from "react";
import NoteContext from "./NoteContext";
import WebServiceInvokerRest from "../../util/WebServiceInvokerRest";
import AlertContext from "../alert/AlertContext";
import { useSelector } from "react-redux";

const NoteState = (props) => {

    const auth = useSelector((state) => state.auth);

    const authToken = auth.authToken;

    const alertValue = useContext(AlertContext);

    const [notes, setNotes] = useState([]);

    const fetchallnotes = async () => {
        let response = await WebServiceInvokerRest("api/notes/fetchallnotes", "GET", null, authToken, null);
        let notesFromAPI;
        if (response.status !== 200) {
            alertValue.showAlert("danger", "Error fetching notes");
            notesFromAPI = [];
        }
        else {
            notesFromAPI = response.data;
        }
        setNotes(notesFromAPI);
    }

    //Add a note
    const addNote = async (title, description, tag) => {
        const requestBody = {
            "title": title,
            "description": description,
            "tag": tag
        };
        let response = await WebServiceInvokerRest("api/notes/addnote", "POST", null, authToken, requestBody);
        if (response.status === 200) {
            alertValue.showAlert("success", "Note has been added successfully");
            setNotes(notes.concat(response.data))
        }
        else {
            alertValue.showAlert("danger", "Something went wrong in adding the note");
        }
    }

    //Delete a note
    const deleteNote = async (id) => {
        let response = await WebServiceInvokerRest(`api/notes/deletenote/${id}`, "DELETE", null, authToken, null);

        if (response.status === 200) {
            alertValue.showAlert("success", "Note has been deleted successfully");
            let newNotes = notes.filter((note) => {
                return note._id !== response.data.note._id;
            })
            setNotes(newNotes);
        }
        else {
            alertValue.showAlert("danger", "Something went wrong in deleting the note");
        }
    }

    // Edit a note
    const editNote = async (id, title, description, tag) => {
        let requestBody = {
            "title": title,
            "description": description,
            "tag": tag
        }
        let response = await WebServiceInvokerRest(`api/notes/updatenote/${id}`, 'PATCH', null, authToken, requestBody);

        if (response.status === 200) {
            alertValue.showAlert("success", "Note has been updated successfully");
            let newNotes = JSON.parse(JSON.stringify(notes));
            for (let i = 0; i < newNotes.length; i++) {
                let elem = newNotes[i];
                if (elem._id === id) {
                    elem.title = response.data.title;
                    elem.description = response.data.description;
                    elem.tag = response.data.tag;
                    break;
                }
            }
            setNotes(newNotes);
        }
        else {
            alertValue.showAlert("danger", "Something went wrong in updating the note");
        }
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, fetchallnotes }}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;