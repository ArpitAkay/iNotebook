import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {

    const details = {
        name: "Arpit Kumar",
        email: "arpitkumar4000@gmail.com"
    }

    const [state, setState] = useState(details);

    const updateState = () => {
        setTimeout(() => {
            setState({
                name: "Aditya Kumar",
                email: "adityakumar4000@gmail.com"
            })
        }, 1000)
    }

    return (
        <NoteContext.Provider value={{state, updateState}}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;