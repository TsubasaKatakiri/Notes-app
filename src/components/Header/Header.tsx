import React, {useContext} from 'react';
import { ModalsContext } from '../../context/Modal/ModalContext';
import { NotesContext } from '../../context/Notes/NotesContext';
import { INote } from '../../models';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import Search from '../Search/Search';
import classes from './Header.module.scss';

const Header = () => {
    const {modalCreate, openCreate, closeCreate} = useContext(ModalsContext);
    const {addNote} = useContext(NotesContext);

    const createHandler = (note: INote) : void => {
        closeCreate();
        console.log(note);
        addNote(note);
    }

    return (
        <div className={classes.header}>
            <h1 className={classes.header__logo}>Notes App</h1>
            <Search/>
            <button className={classes.header__button} onClick={() => openCreate()}>Add Note</button>
            {modalCreate && 
                <Modal onClose={() => closeCreate()} title={'Create New Note'}>
                    <NoteForm onCreate={createHandler}/>
                </Modal>
            }
        </div>
    );
};

export default Header;