import React, {useContext} from 'react';
import { ModalContext } from '../../context/ModalContext';
import { NotesContext } from '../../context/Notes/NotesContext';
import { INote } from '../../models';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import classes from './Header.module.scss';

const Header = () => {
    const {modal, open, close} = useContext(ModalContext);
    const {addNote} = useContext(NotesContext);

    const createHandler = (note: INote) => {
        close();
        console.log(note);
        addNote(note);
    }

    return (
        <div className={classes.header}>
            <h1 className={classes.header__logo}>Notes App</h1>
            <button className={classes.header__button} onClick={() => open()}>Add Note</button>
            {modal && 
                <Modal onClose={() => close()} title={'Create New Note'}>
                    <NoteForm onCreate={createHandler}/>
                </Modal>
            }
        </div>
    );
};

export default Header;