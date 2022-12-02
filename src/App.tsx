import React, { useState, useEffect, useContext } from 'react';
import Header from './components/Header/Header';
import Note from './components/Note/Note';
import classes from './App.module.scss';
import { NotesContext } from './context/Notes/NotesContext';


function App() {
  const {notes, loadNotes, addNote, editNote, deleteNote} = useContext(NotesContext);

  useEffect(() => {
    loadNotes();
  }, [])

  return (
    <div className="App">
      <Header/>
      <div className={classes.notes}>
        {notes && notes.map((note : any) => {
          return <Note key={note.id} note={note}/>
        })}
      </div>
    </div>
  );
}

export default App;
