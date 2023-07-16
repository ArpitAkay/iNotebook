import React, { useContext, useEffect }  from 'react'
import NoteContext from '../context/notes/NoteContext'

const About = () => {

  const state = useContext(NoteContext);

  useEffect(() => {
    console.log("useEffect called");
    state.updateState();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      This is about {state.state.name} and his email is {state.state.email}
    </div>
  )
}

export default About
