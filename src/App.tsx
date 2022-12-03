import { useEffect, useContext } from 'react';
import Header from './components/Header/Header';
import Note from './components/Note/Note';
import classes from './App.module.scss';
import { NotesContext } from './context/Notes/NotesContext';
import { INote } from './models';
import { ModalsContext } from './context/Modal/ModalContext';
import Modal from './components/Modal/Modal';
import NoteEditForm from './components/NoteEditForm/NoteEditForm';


function App() {
  const {notes, currentNote, setNote, loadNotes, editNote, deleteNote} = useContext(NotesContext);
  const {modalDelete, closeDelete, modalEdit, closeEdit} = useContext(ModalsContext);

  useEffect(() => {
    loadNotes();
  }, [])

  //Deletion Modal
  const handleDelete = () : void => {
    closeDelete();
    if(currentNote) deleteNote(currentNote.id);
    setNote(null);
  }

  const handleCloseDelete = () : void => {
    closeDelete();
    setNote(null);
  }


  //Edit Modal
  const handleEdit = () : void => {
    closeEdit();
    if(currentNote) editNote(currentNote);
    setNote(null);
  }

  const handleCloseEdit = () : void => {
    closeEdit();
    setNote(null);
  }


  return (
    <div className="App">
      <Header/>
      <div className={classes.notes}>
        {notes.map((note : INote) => {
          return <Note key={note.id} note={note}/>
        })}
      </div>
      {modalDelete && 
        <Modal onClose={handleCloseDelete} title={'Delete Note'}>
          <div className={classes.content}>
            <p className={classes.content__caption}>Are you sure?</p>
            <div className={classes.content__buttons}>
              <button className={classes.button} onClick={handleDelete}>OK</button>
              <button className={classes.button} onClick={handleCloseDelete}>Cancel</button>
            </div>
          </div>
        </Modal>
      }
      {modalEdit && 
        <Modal onClose={handleCloseEdit} title={'Edit Note'}>
          <NoteEditForm note={currentNote} onSaveEdit={handleEdit}/>
        </Modal>
      }
    </div>
  );
}

export default App;
